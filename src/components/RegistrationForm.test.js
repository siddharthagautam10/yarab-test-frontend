import React from "react";
import {render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import RegistrationForm from "./RegistrationForm";

test('renders registration form', ()=>{
    render(<RegistrationForm />);
    expect(screen.getByText(/First Name/i)).toBeInTheDocument();
});

test('validate first name length', ()=>{
    render(<RegistrationForm />);
    fireEvent.change(screen.getByText(/First Name/i)), {target: {value: 'Si'}})
    fireEvent.click(screen.getByText(/Register/i));
    expect(screen.getByText(/First Name must be atleast 3 characters/i)).toBeInTheDocument();
});