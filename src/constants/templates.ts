const TEMPLATES_PATH = "/templates";

interface Template {
  id: string;
  label: string;
  image: string;
  initialContent: string;
}

export const templates: Template[] = [
  {
    id: "blank",
    label: "Blank Document",
    image: `${TEMPLATES_PATH}/blank-document.svg`,
    initialContent: ``,
  },
  {
    id: "business-letter",
    label: "Business Letter",
    image: `${TEMPLATES_PATH}/business-letter.svg`,
    initialContent: `
      <p>[Your Name]</p>
      <p>[Your Address]</p>
      <p>[City, State ZIP Code]</p>
      <p>[Date]</p>

      <p>[Recipient's Name]</p>
      <p>[Recipient's Title]</p>
      <p>[Company Name]</p>
      <p>[Company Address]</p>

      <p>Dear [Recipient's Name],</p>

      <p>I am writing to formally address [subject of the letter]. This letter outlines the necessary details and expectations regarding this matter.</p>

      <p>Thank you for your attention.</p>

      <p>Sincerely,</p>
      <p>[Your Name]</p>
    `,
  },
  {
    id: "cover-letter",
    label: "Cover Letter",
    image: `${TEMPLATES_PATH}/cover-letter.svg`,
    initialContent: `
      <p>[Your Name]</p>
      <p>[Your Address]</p>
      <p>[City, State ZIP Code]</p>
      <p>[Email Address]</p>
      <p>[Phone Number]</p>
      <p>[Date]</p>

      <p>[Hiring Manager's Name]</p>
      <p>[Company Name]</p>
      <p>[Company Address]</p>

      <p>Dear [Hiring Manager's Name],</p>

      <p>I am writing to express my interest in the [Job Title] position at [Company Name]. With my background in [Your Field] and a strong passion for [Relevant Skill/Industry], I am confident I can contribute to your team.</p>

      <p>Thank you for considering my application. I look forward to the opportunity to further discuss how I can benefit your organization.</p>

      <p>Sincerely,</p>
      <p>[Your Name]</p>
    `,
  },
  {
    id: "letter",
    label: "Letter",
    image: `${TEMPLATES_PATH}/letter.svg`,
    initialContent: `
      <p>Dear [Recipient's Name],</p>

      <p>I hope this letter finds you well. I wanted to take a moment to [purpose of the letter].</p>

      <p>Please feel free to reach out if you have any questions or need further information.</p>

      <p>Sincerely,</p>
      <p>[Your Name]</p>
    `,
  },
  {
    id: "project-proposal",
    label: "Project Proposal",
    image: `${TEMPLATES_PATH}/project-proposal.svg`,
    initialContent: `
      <h1>Project Proposal</h1>

      <h2>Introduction</h2>
      <p>This document outlines the proposal for [Project Name].</p>

      <h2>Objectives</h2>
      <p>The project aims to achieve the following objectives:</p>
      <ul>
        <li>[Objective 1]</li>
        <li>[Objective 2]</li>
        <li>[Objective 3]</li>
      </ul>

      <h2>Methodology</h2>
      <p>Details on how the project will be executed.</p>

      <h2>Timeline</h2>
      <p>Expected project phases and milestones.</p>

      <h2>Budget</h2>
      <p>Estimated cost and funding requirements.</p>
    `,
  },
  {
    id: "resume",
    label: "Resume",
    image: `${TEMPLATES_PATH}/resume.svg`,
    initialContent: `
      <h1>[Your Name]</h1>
      <p>[Email] • [Phone] • [LinkedIn] • [Website]</p>

      <h2>Professional Summary</h2>
      <p>Experienced [Job Title] with a proven track record in [Skills/Industries].</p>

      <h2>Experience</h2>
      <p><strong>[Job Title]</strong> – [Company Name] ([Start Date] – [End Date])</p>
      <ul>
        <li>[Key responsibility or achievement]</li>
        <li>[Key responsibility or achievement]</li>
      </ul>

      <h2>Education</h2>
      <p><strong>[Degree]</strong> – [Institution Name] ([Year])</p>

      <h2>Skills</h2>
      <ul>
        <li>[Skill One]</li>
        <li>[Skill Two]</li>
        <li>[Skill Three]</li>
      </ul>
    `,
  },
  {
    id: "software-proposal",
    label: "Software Proposal",
    image: `${TEMPLATES_PATH}/software-proposal.svg`,
    initialContent: `
      <h1>Software Development Proposal</h1>

      <h2>Project Overview</h2>
      <p>Brief description of the proposed software development project.</p>

      <h2>Scope of Work</h2>
      <p>Detailed breakdown of project deliverables and requirements.</p>

      <h2>Timeline</h2>
      <p>Project milestones and delivery schedule.</p>

      <h2>Budget</h2>
      <p>Cost breakdown and payment terms.</p>
    `,
  },
];
