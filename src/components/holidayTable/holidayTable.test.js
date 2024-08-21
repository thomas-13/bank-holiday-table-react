import {render, screen} from '@testing-library/react'

import { HolidayTable } from "./holidayTable";

describe('HolidayTable', () => {

  it('check table render', ()=>{
    render(<HolidayTable/>)
    const tbl = screen.queryByTitle("table");
    expect(tbl).toBeTruthy();
  })

  it('All table headers are rendered',async ()=>{
    render(<HolidayTable/>);
    const headers = await screen.findAllByRole("columnheader");
    expect(headers.length).toBe(4);
    expect(headers[0]).toHaveTextContent('Date');
    expect(headers[1]).toHaveTextContent('Title');
    expect(headers[2]).toHaveTextContent('Bunting');
    expect(headers[3]).toHaveTextContent('Notes');
  })

})

