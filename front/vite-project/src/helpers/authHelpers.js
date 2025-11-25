export const getLoggedUser = () => {
    try {
        const userInfo = localStorage.getItem('user');
        if (userInfo) {
            return JSON.parse(userInfo);
        }
        return null;
    } catch (error) {
        console.error('Error al obtener información del usuario:', error);
        return null;
    }
};

export const isUserLoggedIn = () => {
    const userInfo = getLoggedUser();
    return userInfo && userInfo.access === true;
};

export const logoutUser = () => {
    try {
        localStorage.removeItem('user');
        return true;
    } catch (error) {
        console.error('Error al cerrar sesión:', error);
        return false;
    }
};

export const getUserId = () => {
    const userInfo = getLoggedUser();
    return userInfo?.user?.id || null;
};

export const getUserName = () => {
    const userInfo = getLoggedUser();
    return userInfo?.user?.name || null;
};

export const getAuthHeaders = () => {
    if (isUserLoggedIn()) {
        return {
            'token': 'autenticado',
            'Content-Type': 'application/json'
        };
    }
    return {
        'Content-Type': 'application/json'
    };
};
