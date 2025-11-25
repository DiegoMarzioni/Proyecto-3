
const REGEX_PATTERNS = {
    email: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
    password: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
    username: /^[a-zA-Z0-9_]{3,20}$/,
    name: /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]{2,50}$/,
    dni: /^\d{7,8}$/,
    phone: /^[+]?[1-9][\d]{0,15}$/,
    date: /^\d{4}-\d{2}-\d{2}$/
};


const ERROR_MESSAGES = {
    required: 'Este campo es obligatorio',
    email: {
        invalid: 'Ingresa un email válido (ejemplo: usuario@dominio.com)',
        required: 'El email es obligatorio'
    },
    password: {
        invalid: 'La contraseña debe tener al menos 8 caracteres, incluir mayúscula, minúscula, número y símbolo especial',
        required: 'La contraseña es obligatoria',
        minLength: 'La contraseña debe tener al menos 8 caracteres'
    },
    username: {
        invalid: 'El usuario debe tener 3-20 caracteres, solo letras, números y guiones bajos',
        required: 'El nombre de usuario es obligatorio',
        minLength: 'El usuario debe tener al menos 3 caracteres',
        maxLength: 'El usuario no puede exceder 20 caracteres'
    },
    name: {
        invalid: 'El nombre solo puede contener letras y espacios',
        required: 'El nombre es obligatorio',
        minLength: 'El nombre debe tener al menos 2 caracteres',
        maxLength: 'El nombre no puede exceder 50 caracteres'
    },
    dni: {
        invalid: 'El DNI debe tener entre 7 y 8 dígitos',
        required: 'El DNI es obligatorio'
    },
    birthdate: {
        invalid: 'Selecciona una fecha válida',
        required: 'La fecha de nacimiento es obligatoria',
        minAge: 'Debes ser mayor de 16 años',
        maxAge: 'Fecha de nacimiento inválida'
    }
};


export const validateField = (fieldName, value, additionalRules = {}) => {
    
    if (additionalRules.required && (!value || value.toString().trim() === '')) {
        return ERROR_MESSAGES.required;
    }
    
    
    if (!value || value.toString().trim() === '') {
        return null;
    }
    
    switch (fieldName) {
        case 'email':
            return validateEmail(value);
            
        case 'password':
            return validatePassword(value, additionalRules);
            
        case 'username':
            return validateUsername(value);
            
        case 'name':
            return validateName(value);
            
        case 'nDni':
        case 'dni':
            return validateDni(value);
            
        case 'birthdate':
            return validateBirthdate(value);
            
        default:
            return null;
    }
};


const validateEmail = (email) => {
    if (!REGEX_PATTERNS.email.test(email)) {
        return ERROR_MESSAGES.email.invalid;
    }
    return null;
};

const validatePassword = (password, rules = {}) => {
    if (password.length < 8) {
        return ERROR_MESSAGES.password.minLength;
    }
    
    if (rules.strong) {
        const strength = getPasswordStrength(password);
        if (strength.level < 4) {
            return 'La contraseña debe ser al menos "Fuerte". Debe incluir mayúscula, minúscula, número y símbolo especial.';
        }
    }
    
    return null;
};

const validateUsername = (username) => {
    if (username.length < 3) {
        return ERROR_MESSAGES.username.minLength;
    }
    
    if (username.length > 20) {
        return ERROR_MESSAGES.username.maxLength;
    }
    
    if (!REGEX_PATTERNS.username.test(username)) {
        return ERROR_MESSAGES.username.invalid;
    }
    
    return null;
};

const validateName = (name) => {
    if (name.length < 2) {
        return ERROR_MESSAGES.name.minLength;
    }
    
    if (name.length > 50) {
        return ERROR_MESSAGES.name.maxLength;
    }
    
    if (!REGEX_PATTERNS.name.test(name)) {
        return ERROR_MESSAGES.name.invalid;
    }
    
    return null;
};

const validateDni = (dni) => {
    if (!REGEX_PATTERNS.dni.test(dni)) {
        return ERROR_MESSAGES.dni.invalid;
    }
    
    return null;
};

const validateBirthdate = (birthdate) => {
    if (!REGEX_PATTERNS.date.test(birthdate)) {
        return ERROR_MESSAGES.birthdate.invalid;
    }
    
    const today = new Date();
    const birth = new Date(birthdate);
    let age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
        age--;
    }
    
    if (age < 16) {
        return ERROR_MESSAGES.birthdate.minAge;
    }
    
    if (age > 120) {
        return ERROR_MESSAGES.birthdate.maxAge;
    }
    
    return null;
};


export const validateForm = (formData, validationRules) => {
    const errors = {};
    
    Object.keys(validationRules).forEach(fieldName => {
        const rules = validationRules[fieldName];
        let value = formData[fieldName];
        
        if (fieldName.includes('.')) {
            const keys = fieldName.split('.');
            value = keys.reduce((obj, key) => obj?.[key], formData);
        }
        
        const error = validateField(fieldName.split('.').pop(), value, rules);
        if (error) {
            errors[fieldName] = error;
        }
    });
    
    return {
        isValid: Object.keys(errors).length === 0,
        errors
    };
};


export const validateOnChange = (fieldName, value) => {
    
    if (!value || value.toString().trim() === '') {
        return null; 
    }
    
    switch (fieldName) {
        case 'email':
            
            if (value.includes('@') && !REGEX_PATTERNS.email.test(value)) {
                return ERROR_MESSAGES.email.invalid;
            }
            return null;
            
        case 'password':
            if (value.length > 0 && value.length < 8) {
                return ERROR_MESSAGES.password.minLength;
            }
            return null;
            
        case 'username':
            if (value.length > 0 && value.length < 3) {
                return ERROR_MESSAGES.username.minLength;
            }
            if (value.length > 20) {
                return ERROR_MESSAGES.username.maxLength;
            }
            if (value.length >= 3 && !REGEX_PATTERNS.username.test(value)) {
                return ERROR_MESSAGES.username.invalid;
            }
            return null;
            
        case 'name':
            if (value.length > 50) {
                return ERROR_MESSAGES.name.maxLength;
            }
            if (value.length >= 2 && !REGEX_PATTERNS.name.test(value)) {
                return ERROR_MESSAGES.name.invalid;
            }
            return null;
            
        case 'nDni':
        case 'dni':
            if (value.length > 0 && !REGEX_PATTERNS.dni.test(value)) {
                return ERROR_MESSAGES.dni.invalid;
            }
            return null;
            
        default:
            return null;
    }
};


export const getPasswordStrength = (password) => {
    if (!password) return { level: 0, text: '', color: '' };
    
    let score = 0;
    const checks = {
        length: password.length >= 8,
        lowercase: /[a-z]/.test(password),
        uppercase: /[A-Z]/.test(password),
        numbers: /\d/.test(password),
        symbols: /[@$!%*?&]/.test(password)
    };
    
    score = Object.values(checks).filter(Boolean).length;
    
    const levels = {
        0: { level: 0, text: '', color: '' },
        1: { level: 1, text: 'Muy débil', color: '#ff4444' },
        2: { level: 2, text: 'Débil', color: '#ff8800' },
        3: { level: 3, text: 'Regular', color: '#ffaa00' },
        4: { level: 4, text: 'Fuerte', color: '#88cc00' },
        5: { level: 5, text: 'Muy fuerte', color: '#00aa00' }
    };
    
    return levels[score];
};
