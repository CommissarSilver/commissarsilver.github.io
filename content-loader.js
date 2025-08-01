// Function to load and parse YAML content
async function loadContent() {
  try {
    const response = await fetch("content.yaml");
    const yamlText = await response.text();
    const content = jsyaml.load(yamlText);

    // Populate profile section
    const profileHeader = document.querySelector(".profile-header");
    if (profileHeader && content.profile) {
      profileHeader.innerHTML = `
        <h1>${content.profile.name || ""}</h1>
        <p>${content.profile.title || ""}</p>
      `;
    }

    // Populate about me section
    const aboutMe = document.querySelector(".about-me");
    if (aboutMe && content.aboutMe && content.aboutMe.texts) {
      aboutMe.innerHTML = `
        <h2>About Me</h2>
        <div id="typed-text"></div>
      `;

      // Initialize typing effect
      const typedTextElement = document.getElementById("typed-text");
      if (typedTextElement) {
        const typingEffect = new TypingEffect(
          typedTextElement,
          content.aboutMe.texts
        );
        typingEffect.type();

        // Store the typing effect instance for potential future use
        window.typingEffect = typingEffect;
      }
    }

    // Populate contact section
    const contactSection = document.querySelector(".contact-section");
    if (contactSection && content.contact && content.contact.social) {
      contactSection.innerHTML = `
        <h2>Get in Touch</h2>
        <div class="social-links">
          ${content.contact.social
            .map(
              (link) => `
            <a href="${link.url}" target="_blank" rel="noopener noreferrer">${link.name}</a>
          `
            )
            .join("")}
        </div>
      `;
    }

    // Populate projects/publications section
    const projectsSection = document.querySelector(".projects");
    if (projectsSection && content.publications) {
      projectsSection.innerHTML = `
        <h2>Publications & Projects</h2>
        <div class="project-grid">
          ${content.publications
            .map(
              (pub) => `
            <div class="project-item">
              <h3>${pub.title}</h3>
              <p>${pub.description}</p>
              ${
                pub.links
                  ? `
                <div class="project-links">
                  ${pub.links
                    .map(
                      (link) => `
                    <a href="${link.url}" target="_blank" rel="noopener noreferrer">${link.name}</a>
                  `
                    )
                    .join("")}
                </div>
              `
                  : ""
              }
            </div>
          `
            )
            .join("")}
        </div>
      `;
    }
  } catch (error) {
    console.error("Error loading content:", error);
    // Add fallback content in case of error
    document.querySelector(".profile-header").innerHTML = `
      <h1>Vahid Majdinasab</h1>
      <p>Machine Learning Engineer/Researcher</p>
    `;
  }
}

// Load content when the document is ready
document.addEventListener("DOMContentLoaded", loadContent);
