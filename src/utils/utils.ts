export const getPageName = () => {
    const urlSections = window.location.toString().split('/');
    return urlSections[urlSections.length - 1];
}