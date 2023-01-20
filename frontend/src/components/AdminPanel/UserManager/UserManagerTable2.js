import React, { useState, useRef, useEffect, useMemo, useCallback } from 'react';
// import { render } from 'react-dom';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';

const UserManagerTable2 = () => {

    const gridRef = useRef();
    const [rowData, setRowData] = useState();

    const [columnDefs] = useState([
        { field: 'userName', filter: true },
        { field: 'id', filter: true },
    ]);

    const defaultColDef = useMemo(() => ({
        sortable: true
    }), []);

    const cellClickedListener = useCallback(event => {
        console.log('cellClicked', event);
    }, []);

    //Load data from API
    useEffect(() => {
        const jwtToken = localStorage.getItem('jwt').replace('"', '')
        fetch('http://api.localhost/api/User', {
            method: 'GET',
            headers: {
                Authorization: 'Bearer ' + jwtToken
            }
        }).then(response => response.json()).then(rowData => setRowData(rowData))
    }, []);

    // const buttonListener = useCallback(e => {
    //     gridRef.current.api.deselectAll();
    // }, []);

    return (
        <div>

            {/* <button onClick={buttonListener}>Push Me</button> */}

            <div className="ag-theme-alpine" style={{ width: 500, height: 500 }}>

                <AgGridReact
                    ref={gridRef}

                    rowData={rowData}

                    columnDefs={columnDefs}
                    defaultColDef={defaultColDef}

                    animateRows={true} // Optional - set to 'true' to have rows animate when sorted
                    rowSelection='multiple' // Options - allows click selection of rows

                    onCellClicked={cellClickedListener} // Optional - registering for Grid Event
                />
            </div>
        </div>
    );
};

export default UserManagerTable2;