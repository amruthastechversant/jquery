$(document).ready(function() {
    const $form = $('#myForm');
    const $errorMsg = $('#errorMsg');
    const $fnameInput = $('#fname');
    const $lnameInput = $('#lname');
    const $ageInput = $('#age');
    const $profileInput = $('#profile');
    const $addressInput = $('#address');
    const $phonenoInput = $('#phoneno');
    
    let jsonData = {};
    const phoneRegex = /^\d{10}$/;

    $.getJSON('data.json')
        .done(function(data) {
            jsonData = data;
        })
        .fail(function(error) {
            console.error('Error fetching JSON data:', error);
        });

    function displayError(message) {
        $errorMsg.html(message).css('color', 'red');
    }

    function clearError() {
        $errorMsg.html('');
    }

    $form.on('input', function() {
        const fname = $fnameInput.val().trim();
        const lname = $lnameInput.val().trim();
        const age = $ageInput.val().trim();
        const profile = $profileInput.val().trim();
        const address = $addressInput.val().trim();
        const phoneno = $phonenoInput.val().trim();

        const nameExists = jsonData.some(person => person.Firstname === fname);
        const lnameExists = jsonData.some(person => person.Lastname === lname);
        const profileExists = jsonData.some(person => person.Profile === profile);
        const addressExists = jsonData.some(person => person.Address === address);
        const nameAndPhoneExists = jsonData.some(person =>
            (person.Firstname === fname && person.Lastname === lname) &&
            person.Phonenumber === phoneno
        );
        const phonenoExists = jsonData.some(person => person.Phonenumber === phoneno);

        if (nameExists) {
            $('#fnameerror').text('');
        }
        if (lnameExists) {
            $('#lnameerror').text('');
        }
        if (age !== '' && parseInt(age, 10) > 100) {
            $('#ageerror').text('Age should not be greater than 100');
        } else {
            $('#ageerror').text('');
        }
        if (profileExists) {
            $('#profileerror').text('Profile exists');
        } else {
            $('#profileerror').text('');
        }
        if (addressExists) {
            $('#addresserror').text('Address exists');
        } else {
            $('#addresserror').text('');
        }
       if (nameAndPhoneExists) {
           $('#phonenoerror').text('Combination of Firstname, Lastname, and Phone number already exists.');
        }  else if (phonenoExists)  {
            $('#phonenoerror').text('phoneno already exist');
        }
        
    });

    $form.on('submit', function(event) {
        event.preventDefault();
        clearError();

        const fname = $fnameInput.val().trim();
        const lname = $lnameInput.val().trim();
        const age = $ageInput.val().trim();
        const profile = $profileInput.val().trim();
        const address = $addressInput.val().trim();
        const phoneno = $phonenoInput.val().trim();

        let errors = [];
        let isValid = true;

        if (fname === '') {
            errors.push('Firstname is required.');
            isValid = false;
        }

        if (lname === '') {
            errors.push('Lastname is required.');
            isValid = false;
        }

        if (age === '') {
            errors.push('Age is required.');
            isValid = false;
        } else if (parseInt(age, 10) > 100) {
            errors.push('Age should not be greater than 100.');
            isValid = false;
        }

        if (profile === '') {
            errors.push('Profile is required.');
            isValid = false;
        }

        if (address === '') {
            errors.push('Address is required.');
            isValid = false;
        }

        if (phoneno === '') {
            errors.push('Phone number is required.');
            isValid = false;
        } else if (!phoneRegex.test(phoneno)) {
            errors.push('Phone number must be 10 digits.');
            isValid = false;
        }

        if (errors.length > 0) {
            $errorMsg.html(errors.join('<br>')).css('color', 'red');
        } else {
            clearError();
            alert('Form submitted successfully!');
            $form[0].reset();
        }
    });
});
