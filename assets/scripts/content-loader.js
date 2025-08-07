// functions to load and parse yml
async function loadContent() {
  try {
    const response = await fetch(WEBSITE_CONFIG.contentFile);
    const yamlText = await response.text();
    const content = jsyaml.load(yamlText);

    // populate profile section
    const profileHeader = document.querySelector(".profile-header");
    if (profileHeader && content.profile) {
      profileHeader.innerHTML = `
        <h1>${content.profile.name || ""}</h1>
        <p>${content.profile.title || ""}</p>
      `;
    }

    // populate about me section
    const aboutMe = document.querySelector(".about-me");
    if (aboutMe && content.aboutMe && content.aboutMe.texts) {
      aboutMe.innerHTML = `
        <h2>About Me</h2>
        <div id="typed-text"></div>
      `;

      // initialize typing effect
      const typedTextElement = document.getElementById("typed-text");
      if (typedTextElement) {
        const typingEffect = new TypingEffect(
          typedTextElement,
          content.aboutMe.texts
        );
        typingEffect.type();

        // enable click to change text functionality
        typingEffect.enableClickToChange(aboutMe);

        // store the typing effect instance for potential future use
        window.typingEffect = typingEffect;
      }
    }

    // populate contact section
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

    // populate projects/publications section
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
    // add fallback content in case of error
    document.querySelector(".profile-header").innerHTML = `
      <h1>Vahid Majdinasab</h1>
      <p>Machine Learning Engineer/Researcher</p>
    `;
  }
}

// load content when the document is ready
document.addEventListener("DOMContentLoaded", loadContent);
