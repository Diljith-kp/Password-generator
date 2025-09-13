document.addEventListener('DOMContentLoaded', () => {
    const passwordOutput = document.getElementById('passwordOutput');
    const copyButton = document.getElementById('copyButton');
    const lengthSlider = document.getElementById('length');
    const lengthValue = document.getElementById('lengthValue');
    const includeUppercase = document.getElementById('includeUppercase');
    const includeLowercase = document.getElementById('includeLowercase');
    const includeNumbers = document.getElementById('includeNumbers');
    const includeSymbols = document.getElementById('includeSymbols');
    const generateButton = document.getElementById('generateButton');
    
    const strengthInput = document.getElementById('strengthInput');
    const strengthBar = document.getElementById('strengthBar');
    const strengthText = document.getElementById('strengthText');

    const characters = {
        uppercase: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
        lowercase: 'abcdefghijklmnopqrstuvwxyz',
        numbers: '0123456789',
        symbols: '!@#$%^&*()_+~`|}{[]:;?><,./-='
    };

    const generatePassword = () => {
        const length = lengthSlider.value;
        let charset = '';
        let password = '';

        if (includeUppercase.checked) charset += characters.uppercase;
        if (includeLowercase.checked) charset += characters.lowercase;
        if (includeNumbers.checked) charset += characters.numbers;
        if (includeSymbols.checked) charset += characters.symbols;
        
        if (charset === '') {
            passwordOutput.value = 'Select options';
            return;
        }
        
        if (includeUppercase.checked) password += characters.uppercase[Math.floor(Math.random() * characters.uppercase.length)];
        if (includeLowercase.checked) password += characters.lowercase[Math.floor(Math.random() * characters.lowercase.length)];
        if (includeNumbers.checked) password += characters.numbers[Math.floor(Math.random() * characters.numbers.length)];
        if (includeSymbols.checked) password += characters.symbols[Math.floor(Math.random() * characters.symbols.length)];

        for (let i = password.length; i < length; i++) {
            const randomIndex = Math.floor(Math.random() * charset.length);
            password += charset[randomIndex];
        }
        
        passwordOutput.value = password.split('').sort(() => 0.5 - Math.random()).join('');
    };

    const copyPassword = () => {
        if (passwordOutput.value && passwordOutput.value !== 'Select options') {
            navigator.clipboard.writeText(passwordOutput.value).then(() => {
                const originalSVG = copyButton.innerHTML;
                copyButton.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>`;
                setTimeout(() => {
                    copyButton.innerHTML = originalSVG;
                }, 1500);
            }).catch(err => {
                console.error('Failed to copy text: ', err);
                alert('Failed to copy password.');
            });
        }
    };
    
    const checkPasswordStrength = () => {
        const password = strengthInput.value;
        let score = 0;
        
        if (!password) {
            strengthBar.style.width = '0%';
            strengthText.textContent = 'Strength: Awaiting...';
            return;
        }
        
        if (password.length >= 8) score++;
        if (password.length >= 12) score++;
        if (/[A-Z]/.test(password)) score++;
        if (/[a-z]/.test(password)) score++;
        if (/[0-9]/.test(password)) score++;
        if (/[^A-Za-z0-9]/.test(password)) score++;

        let strength = '';
        let color = '';
        let width = (score / 6) * 100;

        switch (score) {
            case 0:
            case 1:
            case 2:
                strength = 'Weak';
                color = 'var(--strength-weak)';
                break;
            case 3:
            case 4:
                strength = 'Medium';
                color = 'var(--strength-medium)';
                break;
            case 5:
            case 6:
                strength = 'Strong';
                color = 'var(--strength-strong)';
                break;
        }

        strengthBar.style.width = `${width}%`;
        strengthBar.style.backgroundColor = color;
        strengthText.textContent = `Strength: ${strength}`;
    };

    lengthSlider.addEventListener('input', () => {
        lengthValue.textContent = lengthSlider.value;
    });

    generateButton.addEventListener('click', generatePassword);
    copyButton.addEventListener('click', copyPassword);
    strengthInput.addEventListener('input', checkPasswordStrength);
    
    generatePassword();
});