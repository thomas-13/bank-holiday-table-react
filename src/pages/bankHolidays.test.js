import {fireEvent, render, screen } from '@testing-library/react';
import { BankHolidays } from './bankHolidays';

import {QueryClientProvider, QueryClient} from '@tanstack/react-query';

const client = new QueryClient({
    defaultOptions:{
      queries:{
        refetchOnWindowFocus: false,
        refetchOnMount: false
      }
    }
  })

const MockBankHolidays = ()=>{
    return(
        <>
        <QueryClientProvider client={client}>
            <BankHolidays/>
        </QueryClientProvider>
        </>
    )
}

describe('Home page rendering',()=>{

    it('Bank Holiday heading gets rendered',async ()=>{
        render(<MockBankHolidays/>);
        const heading = await screen.findByText(/Bank Holiday List/i);
        expect(heading).toBeInTheDocument();
    })

    it('Correct number of options are present in dropdown list',async ()=>{
        render(<MockBankHolidays/>)
        const selectElement = screen.getByTestId('divison-select');
        const options = selectElement.getElementsByTagName('option');
        expect(options.length).toBe(4);
    })

    it('Holiday table appears when any option other that 1st option is selected from dropdown',()=>{
        render(<MockBankHolidays/>);
        const selectElement = screen.getByTestId('divison-select');
        const holidayTableText = screen.queryByText(/Holidays in/i);
        expect(holidayTableText).toBeNull();

        fireEvent.change(selectElement,{target:{value: 'scotland'}});
        const holidayTableText2 = screen.queryByText(/Holidays in/i);
        expect(holidayTableText2).toBeInTheDocument();
    })

})