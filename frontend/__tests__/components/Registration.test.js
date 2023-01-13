import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { useNavigate } from 'react-router-dom';
import Registration from "../../src/components/Registration";

jest.mock('react-router-dom', () => {
    return {
        ...jest.requireActual('react-router-dom'),
        useNavigate: jest.fn()
    }
});

describe('Registration component', () => {
    let navigate;
    beforeEach(() => {
        navigate = jest.fn();
        useNavigate.mockImplementation(() => navigate);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should render the component correctly', () => {
        const { getByText } = render(<Registration />);
        expect(getByText('Registreer')).toBeInTheDocument();
        expect(getByText('Gebruikersnaam:')).toBeInTheDocument();
        expect(getByText('Email:')).toBeInTheDocument();
        expect(getByText('Wachtwoord:')).toBeInTheDocument();
        expect(getByText('Registreer')).toBeInTheDocument();
    });

    it('should show an error message when the form is submitted without a username', () => {
        const { getByText, getByLabelText } = render(<Registration />);
        const emailInput = getByLabelText('Email:');
        const passwordInput = getByLabelText('Wachtwoord:');
        const submitButton = getByText('Registreer');

        fireEvent.change(emailInput, { target: { value: 'test@email.com' } });
        fireEvent.change(passwordInput, { target: { value: 'password' } });
        fireEvent.click(submitButton);

        expect(getByText('Gebruikersnaam is noodzakelijk')).toBeInTheDocument();
    });

    it('should show an error message when the form is submitted without an email', () => {
        const { getByText, getByLabelText } = render(<Registration />);
        const usernameInput = getByLabelText('Gebruikersnaam:');
        const passwordInput = getByLabelText('Wachtwoord:');
        const submitButton = getByText('Registreer');

        fireEvent.change(usernameInput, { target: { value: 'testuser' } });
        fireEvent.change(passwordInput, { target: { value: 'password' } });
        fireEvent.click(submitButton);

        expect(getByText('Email is noodzakelijk')).toBeInTheDocument();
    });

    it('should show an error message when the form is submitted with an invalid email', () => {
        const { getByText, getByLabelText } = render(<Registration />);
        const usernameInput = getByLabelText('Gebruikersnaam:');
        const emailInput = getByLabelText('Email:');
        const passwordInput = getByLabelText('Wachtwoord:');
        const submitButton = getByText('Registreer');

        fireEvent.change(usernameInput, { target: { value: 'testuser' } });
        fireEvent.change(emailInput, { target: { value: 'invalidemail' } });
        fireEvent.change(passwordInput, { target: { value: 'password' } });
        fireEvent.click(submitButton);

        expect(getByText('Voer a.u.b. een werkende email in')).toBeInTheDocument();

    });

    it('should show an error message when the form is submitted without a password', () => {
        const { getByText, getByLabelText } = render(<Registration />);
        const usernameInput = getByLabelText('Gebruikersnaam:');
        const emailInput = getByLabelText('Email:');
        const submitButton = getByText('Registreer');

        fireEvent.change(usernameInput, { target: { value: 'testuser' } });
        fireEvent.change(emailInput, { target: { value: 'test@email.com' } });
        fireEvent.click(submitButton);

        expect(getByText('Wachtwoord is noodzakelijk')).toBeInTheDocument();

    });

    // it('should navigate to the login page when the form is submitted with valid input', () => {
    //     const { getByText, getByLabelText } = render(<Registration />);
    //     const usernameInput = getByLabelText('Gebruikersnaam:');
    //     const emailInput = getByLabelText('Email:');
    //     const passwordInput = getByLabelText('Wachtwoord:');
    //     const submitButton = getByText('Registreer');
    //
    //     fireEvent.change(usernameInput, { target: { value: 'testuser' } });
    //     fireEvent.change(emailInput, { target: { value: 'test@email.com' } });
    //     fireEvent.change(passwordInput, { target: { value: 'password' } });
    //     fireEvent.click(submitButton);
    //
    //     expect(navigate).toHaveBeenCalledWith('/Login');
    //
    // });
});
