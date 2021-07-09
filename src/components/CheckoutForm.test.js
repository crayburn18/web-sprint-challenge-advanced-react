import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from '@testing-library/user-event';
import CheckoutForm from "./CheckoutForm";

// Write up the two tests here and make sure they are testing what the title shows

test("form header renders", () => {
    render(<CheckoutForm/>);

    const headerElement = screen.queryByText(/checkout form/i);

    expect(headerElement).toBeInTheDocument();
    expect(headerElement).toBeTruthy();
    expect(headerElement).toHaveTextContent(/checkout form/i)
});

test('form shows success message on submit with form details', async () => {
	render(<CheckoutForm />);

	const firstNameInput = screen.getByLabelText(/first name:/i);
	const lastNameInput = screen.getByLabelText(/last name:/i);
	const addressInput = screen.getByLabelText(/address:/i);
	const cityInput = screen.getByLabelText(/city:/i);
	const stateInput = screen.getByLabelText(/state:/i);
	const zipInput = screen.getByLabelText(/zip:/i);

	userEvent.type(firstNameInput, 'Connor');
	userEvent.type(lastNameInput, 'Rayburn');
	userEvent.type(addressInput, '123 ABC Dr');
	userEvent.type(cityInput, 'Phoenix');
	userEvent.type(stateInput, 'Arizona');
	userEvent.type(zipInput, '85358');

	expect(firstNameInput).toBeInTheDocument();
	expect(lastNameInput).toBeInTheDocument();
	expect(addressInput).toBeInTheDocument();
	expect(cityInput).toBeInTheDocument();
	expect(stateInput).toBeInTheDocument();
	expect(zipInput).toBeInTheDocument();

	expect(screen.queryByTestId('successMessage')).toBeFalsy();

	const submitButton = screen.queryByRole('button');
	userEvent.click(submitButton);

	const submitted = screen.getByTestId('successMessage');
	expect(submitted).toBeInTheDocument();

	const successMessage = screen.queryByText(/You have ordered some plants! Woo-hoo!/i);

	expect(successMessage).toBeTruthy();
	expect(successMessage).toBeInTheDocument();
});
