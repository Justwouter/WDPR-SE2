import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import {BrowserRouter, useNavigate} from 'react-router-dom';
import '@testing-library/jest-dom'
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
        const { getByText } = render(<BrowserRouter> <Registration/></BrowserRouter>);
        expect(getByText('Registreer')).toBeInTheDocument();
        expect(getByText('Gebruikersnaam:')).toBeInTheDocument();
        expect(getByText('Email:')).toBeInTheDocument();
        expect(getByText('Wachtwoord:')).toBeInTheDocument();
        expect(getByText('Registreer Nu!')).toBeInTheDocument();
    });

    it('should show an error message when the form is submitted without a username', async () => {
        const { getByText, getByLabelText } = await render(<BrowserRouter> <Registration/></BrowserRouter>);
        const emailInput = getByLabelText('Email:');
        const passwordInput = getByLabelText('Wachtwoord:');
        const submitButton = getByText('Registreer Nu!');

        fireEvent.input(emailInput, { target: { value: 'mail@mail.nl' } });
        fireEvent.input(passwordInput, { target: { value: 'String1!' } });
        fireEvent.click(submitButton);
        expect(getByText('Gebruikersnaam is noodzakelijk')).toBeInTheDocument();
    });

    it('should show an error message when the form is submitted without an email', () => {
        const { getByText, getByLabelText } = render(<BrowserRouter> <Registration/></BrowserRouter>);
        const usernameInput = getByLabelText('Gebruikersnaam:');
        const passwordInput = getByLabelText('Wachtwoord:');
        const submitButton = getByText('Registreer Nu!');

        fireEvent.input(usernameInput, { target: { value: 'testuser' } });
        fireEvent.input(passwordInput, { target: { value: 'String1!' } });
        fireEvent.click(submitButton);

        expect(getByText('Email is noodzakelijk')).toBeInTheDocument();
    });

    it('should show an error message when the form is submitted with an invalid email', () => {
        const { getByText, getByLabelText } = render(<BrowserRouter> <Registration/></BrowserRouter>);
        const usernameInput = getByLabelText('Gebruikersnaam:');
        const emailInput = getByLabelText('Email:');
        const passwordInput = getByLabelText('Wachtwoord:');
        const submitButton = getByText('Registreer Nu!');

        fireEvent.input(usernameInput, { target: { value: 'testuser' } });
        fireEvent.input(emailInput, { target: { value: 'invalidemail' } });
        fireEvent.input(passwordInput, { target: { value: 'String1!' } });
        fireEvent.click(submitButton);

        expect(getByText('Voer a.u.b. een werkende email in')).toBeInTheDocument();

    });

    it('should show an error message when the form is submitted without a password', () => {
        const { getByText, getByLabelText } = render(<BrowserRouter> <Registration/></BrowserRouter>);
        const usernameInput = getByLabelText('Gebruikersnaam:');
        const emailInput = getByLabelText('Email:');
        const submitButton = getByText('Registreer Nu!');

        fireEvent.input(usernameInput, { target: { value: 'testuser' } });
        fireEvent.input(emailInput, { target: { value: 'test@email.com' } });
        fireEvent.click(submitButton);

        expect(getByText('Wachtwoord is noodzakelijk')).toBeInTheDocument();

    });

    it('should show an error message when the form is submitted without any values', () => {
        const { getByText, getByLabelText } = render(<BrowserRouter> <Registration/></BrowserRouter>);
        const submitButton = getByText('Registreer Nu!');
        fireEvent.click(submitButton);

        expect(getByText('Gebruikersnaam is noodzakelijk en Email is noodzakelijk en Wachtwoord is noodzakelijk')).toBeInTheDocument();

    });

    // it('should navigate to the login page when the form is submitted with valid input', () => {
    //     const { getByText, getByLabelText } = render(<BrowserRouter> <Registration/></BrowserRouter>);
    //     const usernameInput = getByLabelText('Gebruikersnaam:');
    //     const emailInput = getByLabelText('Email:');
    //     const passwordInput = getByLabelText('Wachtwoord:');
    //     const submitButton = getByText('Registreer Nu!');
    //
    //     fireEvent.input(usernameInput, { target: { value: 'testuser' } });
    //     fireEvent.input(emailInput, { target: { value: 'test@email.com' } });
    //     fireEvent.input(passwordInput, { target: { value: 'password' } });
    //     fireEvent.click(submitButton);
    //
    //     expect(navigate).toHaveBeenCalledWith('/login');
    //
    // });
});
