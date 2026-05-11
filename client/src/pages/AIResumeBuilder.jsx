import React, { useState, useEffect } from 'react';

// AI-like helpers
const enhanceText = (text, type = 'bullet') => {
    if (!text?.trim()) return '';
    const starters = type === 'summary'
        ? ['Results-driven', 'Strategic', 'Innovative', 'Detail-oriented', 'Dynamic']
        : ['Spearheaded', 'Orchestrated', 'Engineered', 'Accelerated', 'Transformed'];
    const words = text.trim().split(' ');
    const verb = words.length > 1 ? words.slice(1).join(' ') : text;
    const starter = starters[text.length % starters.length];
    return `${starter} ${verb.charAt(0).toLowerCase() + verb.slice(1)}`;
};

const generateSummary = (role, years, industry) => {
    const templates = [
        `Results-driven ${role} with ${years || '5+'} years of experience in ${industry || 'diverse industries'}, specializing in delivering measurable impact through strategic initiatives and cross-functional collaboration.`,
        `Detail-oriented ${role} offering expertise in ${industry || 'key operational domains'}. Proven ability to streamline processes, reduce costs, and exceed performance targets in fast-paced environments.`,
        `Dynamic ${role} passionate about innovation and excellence. Adept at leading teams, managing complex projects, and driving growth in competitive markets.`
    ];
    return templates[(role.length + (years || '').length) % templates.length];
};

const generateSkills = (role) => {
    const skillMap = {
        developer: ['JavaScript', 'React', 'Node.js', 'Python', 'Git'],
        designer: ['Figma', 'Adobe Creative Suite', 'UI/UX', 'Prototyping', 'User Research'],
        marketer: ['SEO', 'Google Analytics', 'Email Marketing', 'Social Media', 'Content Strategy'],
        manager: ['Team Leadership', 'Project Management', 'Budgeting', 'Stakeholder Communication', 'Agile']
    };
    const key = Object.keys(skillMap).find(k => role.toLowerCase().includes(k)) || 'developer';
    return skillMap[key];
};

export default function AIResumeBuilder() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        location: '',
        role: '',
        years: '',
        industry: '',
        summary: '',
        experience: '',
        education: '',
        skills: '',
        projects: ''
    });
    const [enhanced, setEnhanced] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleEnhance = (field) => {
        if (!formData[field]?.trim()) {
            alert(`Please enter your ${field.replace(/([A-Z])/g, ' $1').toLowerCase()} first.`);
            return;
        }
        let enhancedText = '';
        if (field === 'summary') {
            enhancedText = generateSummary(formData.role, formData.years, formData.industry);
        } else if (field === 'skills') {
            enhancedText = generateSkills(formData.role).join(', ');
        } else {
            enhancedText = enhanceText(formData[field], field === 'summary' ? 'summary' : 'bullet');
        }
        setEnhanced(prev => ({ ...prev, [field]: enhancedText }));
    };

    const downloadPDF = async () => {
        try {
            const { jsPDF } = await import('jspdf');
            await import('jspdf-autotable');

            const doc = new jsPDF();
            const pageWidth = doc.internal.pageSize.width;
            const margin = 20;
            const contentWidth = pageWidth - 2 * margin;
            let yPos = 25;

            // ====== HEADER: Name + Contact ======
            // Name
            doc.setFontSize(26);
            doc.setFont('helvetica', 'bold');
            doc.setTextColor(40, 40, 40);
            doc.text(formData.name || 'Your Name', margin, yPos);

            // Contact info (compact, single line if possible)
            doc.setFontSize(10);
            doc.setFont('helvetica', 'normal');
            doc.setTextColor(80, 80, 80);
            const contactParts = [];
            if (formData.email) contactParts.push(`✉️ ${formData.email}`);
            if (formData.phone) contactParts.push(`📱 ${formData.phone}`);
            if (formData.location) contactParts.push(`📍 ${formData.location}`);

            if (contactParts.length > 0) {
                const contactLine = contactParts.join('   •   ');
                const contactLines = doc.splitTextToSize(contactLine, contentWidth);
                doc.text(contactLines, margin, yPos + 10);
                yPos += 22;
            } else {
                yPos += 14;
            }

            // Decorative line under header
            doc.setDrawColor(0, 100, 200); // Blue accent
            doc.setLineWidth(0.8);
            doc.line(margin, yPos, pageWidth - margin, yPos);
            yPos += 10;

            // ====== TARGET ROLE ======
            doc.setFontSize(16);
            doc.setFont('helvetica', 'bold');
            doc.setTextColor(30, 30, 30);
            doc.text(formData.role || 'Professional Summary', margin, yPos);
            yPos += 12;

            // ====== SUMMARY ======
            if (enhanced.summary || formData.summary) {
                doc.setFontSize(11);
                doc.setFont('helvetica', 'normal');
                doc.setTextColor(50, 50, 50);
                const finalSummary = enhanced.summary || formData.summary;
                const summaryLines = doc.splitTextToSize(finalSummary, contentWidth);
                doc.text(summaryLines, margin, yPos);
                yPos += summaryLines.length * 6.5 + 14;
            }

            // Helper function to render a section
            const renderSection = (title, content) => {
                if (!content?.trim()) return 0;

                // Section title
                doc.setFontSize(13);
                doc.setFont('helvetica', 'bold');
                doc.setTextColor(0, 80, 150); // Professional blue
                doc.text(title, margin, yPos);

                // Underline
                const titleWidth = doc.getTextWidth(title);
                doc.setDrawColor(0, 80, 150);
                doc.setLineWidth(0.5);
                doc.line(margin, yPos + 2, margin + Math.min(titleWidth, contentWidth), yPos + 2);

                // Content
                doc.setFontSize(11);
                doc.setFont('helvetica', 'normal');
                doc.setTextColor(50, 50, 50);
                const lines = doc.splitTextToSize(content, contentWidth);
                doc.text(lines, margin, yPos + 8);

                return lines.length * 6.5 + 16;
            };

            // ====== SKILLS ======
            const skillsContent = enhanced.skills || formData.skills;
            if (skillsContent) {
                const height = renderSection('SKILLS', skillsContent);
                yPos += height;
            }

            // ====== EXPERIENCE ======
            const expContent = enhanced.experience || formData.experience;
            if (expContent) {
                const height = renderSection('EXPERIENCE', expContent);
                yPos += height;
            }

            // ====== EDUCATION ======
            if (formData.education) {
                const height = renderSection('EDUCATION', formData.education);
                yPos += height;
            }

            // ====== PROJECTS ======
            if (formData.projects) {
                const height = renderSection('PROJECTS', formData.projects);
                yPos += height;
            }

            // ====== FOOTER ======
            if (yPos < 280) {
                doc.setFontSize(8);
                doc.setTextColor(150, 150, 150);
                doc.text(
                    'Generated with AI Resume Builder • Your data never leaves your browser',
                    margin,
                    287
                );
            }

            // Finalize
            doc.save(`${(formData.name || 'resume').replace(/\s+/g, '_')}.pdf`);
        } catch (error) {
            console.error('PDF Generation Error:', error);
            alert('Failed to generate PDF. Please try again.');
        }

    };

    return (
        <div style={styles.container}>
            <h2 style={styles.title}>AI Resume Builder</h2>
            <p style={styles.subtitle}>Build a professional resume in minutes — powered by smart suggestions.</p>

            {/* Personal Info */}
            <div style={styles.section}>
                <h3>Personal Information</h3>
                <div style={styles.grid2}>
                    <input name="name" placeholder="Full Name *" value={formData.name} onChange={handleChange} style={styles.input} />
                    <input name="email" placeholder="Email" value={formData.email} onChange={handleChange} style={styles.input} />
                    <input name="phone" placeholder="Phone" value={formData.phone} onChange={handleChange} style={styles.input} />
                    <input name="location" placeholder="City, Country" value={formData.location} onChange={handleChange} style={styles.input} />
                </div>
            </div>

            {/* Professional Info */}
            <div style={styles.section}>
                <h3>Professional Details</h3>
                <div style={styles.grid2}>
                    <input name="role" placeholder="Target Job Title *" value={formData.role} onChange={handleChange} style={styles.input} />
                    <input name="years" placeholder="Years of Experience" value={formData.years} onChange={handleChange} style={styles.input} />
                    <input name="industry" placeholder="Industry" value={formData.industry} onChange={handleChange} style={styles.input} />
                </div>
            </div>

            {/* Smart Sections */}
            {[
                { field: 'summary', label: 'Professional Summary', placeholder: 'e.g., Marketing professional with 5+ years...' },
                { field: 'experience', label: 'Work Experience', placeholder: 'e.g., Managed social media campaigns...' },
                { field: 'education', label: 'Education', placeholder: 'e.g., B.A. in Communications, XYZ University' },
                { field: 'skills', label: 'Skills', placeholder: 'e.g., SEO, Google Analytics, Content Creation' },
                { field: 'projects', label: 'Key Projects (Optional)', placeholder: 'e.g., Launched company blog that grew traffic by 200%' }
            ].map(({ field, label, placeholder }) => (
                <div key={field} style={styles.section}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <h3>{label}</h3>
                        {field !== 'education' && field !== 'projects' && (
                            <button
                                onClick={() => handleEnhance(field)}
                                style={{ ...styles.button, backgroundColor: '#6c757d', fontSize: '12px', padding: '4px 8px' }}
                            >
                                AI Enhance
                            </button>
                        )}
                    </div>
                    <textarea
                        name={field}
                        placeholder={placeholder}
                        value={formData[field]}
                        onChange={handleChange}
                        rows={field === 'summary' ? 3 : 2}
                        style={{ ...styles.input, width: '100%', minHeight: '60px' }}
                    />
                    {enhanced[field] && (
                        <div style={styles.enhancedPreview}>
                            <strong>AI Suggestion:</strong> {enhanced[field]}
                        </div>
                    )}
                </div>
            ))}

            {/* Generate & Download */}
            <button
                onClick={downloadPDF}
                disabled={!formData.name.trim() || !formData.role.trim()}
                style={{
                    ...styles.button,
                    backgroundColor: (formData.name.trim() && formData.role.trim()) ? '#28a745' : '#6c757d',
                    width: '100%',
                    padding: '14px',
                    fontSize: '16px',
                    marginTop: '20px'
                }}
            >
                📄 Download Professional PDF Resume
            </button>

            <p style={{ fontSize: '12px', color: '#666', textAlign: 'center', marginTop: '10px' }}>
                Your data stays private — everything runs in your browser.
            </p>
        </div>
    );
}

// Styles
const styles = {
    container: {
        maxWidth: '800px',
        margin: '0 auto',
        padding: '20px',
        fontFamily: '"Segoe UI", Tahoma, Geneva, Verdana, sans-serif',
        color: '#333'
    },
    title: {
        fontSize: '28px',
        fontWeight: '700',
        textAlign: 'center',
        marginBottom: '8px'
    },
    subtitle: {
        textAlign: 'center',
        color: '#666',
        marginBottom: '30px'
    },
    section: {
        marginBottom: '25px',
        padding: '16px',
        border: '1px solid #eaeaea',
        borderRadius: '10px',
        backgroundColor: '#fafafa'
    },
    grid2: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '12px'
    },
    input: {
        width: '100%',
        padding: '10px 12px',
        border: '1px solid #ccc',
        borderRadius: '6px',
        fontSize: '15px',
        transition: 'border 0.2s'
    },
    button: {
        padding: '8px 16px',
        backgroundColor: '#007bff',
        color: 'white',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        fontWeight: '600',
        fontSize: '14px'
    },
    enhancedPreview: {
        marginTop: '8px',
        padding: '10px',
        backgroundColor: '#e7f3ff',
        borderLeft: '4px solid #007bff',
        borderRadius: '4px',
        fontSize: '14px'
    }
};
