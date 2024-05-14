const fillTemplate = (template, variables) => {
    Object.keys(variables).forEach(key => {
        const regex = new RegExp(`{{${key}}}`, 'g');
        template = template.replace(regex, variables[key]);

        return template;
    });
}

export default fillTemplate;