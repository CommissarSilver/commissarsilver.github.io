// functions to load and parse yml
async function loadContent() {
  try {
    const response = await fetch(WEBSITE_CONFIG.contentFile);
    const yamlText = await response.text();
    const content = jsyaml.load(yamlText);
    const socialLinksHtml = renderSocialLinks(content.contact?.social || []);
    const isMobileViewport = window.matchMedia("(max-width: 1023px)").matches;

    // populate profile section
    const profileHeader = document.querySelector(".profile-header");
    if (profileHeader && content.profile) {
      profileHeader.innerHTML = `
        <h1>${content.profile.name || ""}</h1>
        <p class="profile-role">${content.profile.title || ""}</p>
        ${socialLinksHtml ? `<div class="social-links profile-contact">${socialLinksHtml}</div>` : ""}
      `;
    }

    // populate about me section
    const aboutMe = document.querySelector(".about-me");
    if (aboutMe && content.aboutMe && content.aboutMe.texts) {
      const aboutTexts = content.aboutMe.texts.filter(Boolean);

      aboutMe.innerHTML = `
        <h2>About Me</h2>
        <div id="typed-text"></div>
      `;

      const typedTextElement = document.getElementById("typed-text");
      if (typedTextElement) {
        if (isMobileViewport) {
          typedTextElement.textContent = aboutTexts[0] || "";
          window.typingEffect = null;
        } else {
          const typingEffect = new TypingEffect(typedTextElement, aboutTexts);
          typingEffect.type();

          // enable click to change text functionality
          typingEffect.enableClickToChange(aboutMe);

          // store the typing effect instance for potential future use
          window.typingEffect = typingEffect;
        }
      }

      // initialize about me interactive effects
      initializeAboutMeEffects(aboutMe);
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
              <p class="project-description">${pub.description}</p>
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

      initializeScrollIndicator(projectsSection);
    }
  } catch (error) {
    console.error("Error loading content:", error);
    // add fallback content in case of error
    document.querySelector(".profile-header").innerHTML = `
      <h1>Vahid Majdinasab</h1>
      <p class="profile-role">Machine Learning Engineer/Researcher</p>
    `;
  }
}

// initialize About Me interactive effects
function initializeAboutMeEffects(aboutMeSection) {
  const h2 = aboutMeSection.querySelector('h2');
  
  if (!h2) return;

  const glitchChars = ['@', '#', '$', '%', '&', '*', '!', '?', '<', '>', '{', '}', '[', ']', '█', '▓', '▒', '░'];
  let glitchInterval;

  // Character glitch effect
  function triggerGlitch() {
    const originalText = 'About Me';
    let glitchedText = originalText;
    
    // Randomly glitch 1-2 characters
    const numGlitches = Math.random() < 0.5 ? 2 : 7;
    
    for (let i = 0; i < numGlitches; i++) {
      const randomIndex = Math.floor(Math.random() * originalText.length);
      const randomChar = glitchChars[Math.floor(Math.random() * glitchChars.length)];
      glitchedText = glitchedText.substring(0, randomIndex) + randomChar + glitchedText.substring(randomIndex + 1);
    }
    
    h2.textContent = glitchedText;
    h2.classList.add('glitching');
    
    // Restore original text after glitch animation
    setTimeout(() => {
      h2.textContent = originalText;
      h2.classList.remove('glitching');
    }, 100);
  }

  // Start effects
  function startEffects() {
    // Trigger glitch effect randomly every 2-4 seconds
    function scheduleNextGlitch() {
      const delay = 1000 + Math.random() * 2000; // 2-4 seconds
      glitchInterval = setTimeout(() => {
        triggerGlitch();
        scheduleNextGlitch();
      }, delay);
    }
    
    scheduleNextGlitch();
  }

  // Stop effects
  function stopEffects() {
    if (glitchInterval) clearTimeout(glitchInterval);
    h2.textContent = 'About Me';
    h2.classList.remove('glitching');
  }

  // Start the effects
  startEffects();

  // Store cleanup function for potential future use
  aboutMeSection.stopInteractiveEffects = stopEffects;
}

// load content when the document is ready
document.addEventListener("DOMContentLoaded", loadContent);

function renderSocialLinks(links) {
  if (!Array.isArray(links) || links.length === 0) {
    return "";
  }

  return links
    .map(
      (link) => `
        <a href="${link.url}" target="_blank" rel="noopener noreferrer">${link.name}</a>
      `
    )
    .join("");
}

function initializeScrollIndicator(section) {
  if (!section) return;

  const updateScrollState = () => {
    const isScrollable = section.scrollHeight > section.clientHeight + 4;
    const isScrolled = section.scrollTop > 6;
    const isScrolledEnd =
      section.scrollTop + section.clientHeight >= section.scrollHeight - 6;

    section.classList.toggle("is-scrollable", isScrollable);
    section.classList.toggle("is-scrolled", isScrolled);
    section.classList.toggle("is-scrolled-end", isScrolledEnd);
  };

  section.addEventListener("scroll", updateScrollState, { passive: true });
  window.addEventListener("resize", updateScrollState);

  if (typeof ResizeObserver !== "undefined") {
    const observer = new ResizeObserver(updateScrollState);
    observer.observe(section);
    const grid = section.querySelector(".project-grid");
    if (grid) observer.observe(grid);
  }

  requestAnimationFrame(updateScrollState);
}
