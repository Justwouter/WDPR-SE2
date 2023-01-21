import React, { useState, useRef, useEffect, useMemo, useCallback } from 'react';
// import { render } from 'react-dom';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';



const UserManagerTable2 = () => {

    const gridRef = useRef();
    const [rowData, setRowData] = useState();
    const [apiDone, setApiDone] = useState(false);


    const [columnDefs] = useState([
        { field: 'userName', headerName: 'Username', filter: true },
        { field: 'id', headerName: 'Internal ID', filter: true },
        { field: 'role', headerName: 'Roles', filter: true },
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
        setApiDone(false) //Here until a refresh button has been made
        fetch('http://api.localhost/api/User', {
            method: 'GET',
            headers: {
                Authorization: 'Bearer ' + jwtToken
            }
        }).then(response => response.json()).then(rowData => setRowData(rowData)).then(setApiDone(true))
    }, []);

    // const buttonListener = useCallback(e => {
    //     gridRef.current.api.deselectAll();
    // }, []);
    useCallback(() => {
        apiDone ? gridRef.current.api.hideOverlay() : gridRef.current.api.showLoadingOverlay();
        
    }, [apiDone]);

    return (
        <div>

            {/* <button onClick={buttonListener}>Push Me</button> */}
            <div className="ag-theme-alpine" style={{ width: 500, height: 500 }}>

                <AgGridReact
                    overlayLoadingTemplate={
                        '<span class="ag-overlay-loading-center">Please wait while your rows are loading</span>'
                    }
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

//https://ag-grid.com/react-data-grid/column-properties/#reference-columns-colId
//Semi-open source lib licenced under the MIT License
//Some things like a custom context menu are locked to the enterprist lib =(