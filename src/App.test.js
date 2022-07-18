import { render, screen, waitFor, act } from '@testing-library/react';
import App from './App';
import GetSection from './components/GetSection/view';
import PostSection from './components/PostSection/view';
import userEvent from "@testing-library/user-event";
import axios from 'axios';

test('renders 1 query DOM', () => {
  render(<App />);
  const linkElement = screen.getByTestId("text");
  expect(linkElement).toBeInTheDocument();
});

test('renders 1 User Action', async () => {
    render(<PostSection />);
  
    const button = screen.getByTestId("toggle");
  
    expect(screen.queryByTestId("text-input")).toBeInTheDocument()
  
    userEvent.click(button)
    await waitFor(() => {
      expect(screen.queryByTestId("text-input")).toBe(null)
    })
  });
  
  jest.mock('axios');
  const mockResponse = {
      data: {
          text: 'text123'
      }
  }

  test('renders 1 API Call', async () => {
    await act(async () => {
        await axios.get.mockImplementationOnce(() => Promise.resolve(mockResponse));
        render(<GetSection />);
    });
    const textElement = await screen.getByTestId("btn1");
    expect(textElement).toBeInTheDocument();
  });