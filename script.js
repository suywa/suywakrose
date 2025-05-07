function toggleSocials(id) {
    console.log(`toggleSocials called with id: ${id}`); // Debugging log

    // Deactivate all socials-extension sections
    const allSections = document.querySelectorAll('.socials-extension');
    allSections.forEach(section => {
        section.classList.remove('active');
        section.classList.add('inactive');
    });

    // Activate the clicked section
    const element = document.getElementById(id);
    if (element) {
        element.classList.remove('inactive');
        element.classList.add('active');
    } else {
        console.error(`Element with id "${id}" not found`); // Debugging log
    }
}