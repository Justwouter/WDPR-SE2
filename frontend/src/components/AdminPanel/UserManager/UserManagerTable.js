import React, { useState } from 'react';
import { useReactTable, createColumnHelper, useTable} from '@tanstack/react-table'



const UserManagerTable = ({ columns, data }) => {
    // Use the useTable Hook to send the columns and data to build the table
    const {
        getTableProps, // table props from react-table
        getTableBodyProps, // table body props from react-table
        headerGroups, // headerGroups, if your table has groupings
        rows, // rows for the table based on the data passed
        prepareRow // Prepare the row (this function needs to be called for each row before getting the row props)
    } = useReactTable({
        columns,
        data
    }, );

    // Create a state
    const [filterInput, setFilterInput] = useState("");

    // Update the state when input changes
    const handleFilterChange = e => {
        const value = e.target.value || undefined;
        // setFilter("userName", value); // Update the show.name filter. Now our table will filter and show only the rows which have a matching value
        setFilterInput(value);
      };

    // Input element

    return (
        <React.Fragment>

            <input
                value={filterInput}
                onChange={handleFilterChange}
                placeholder={"Search name"}
            />
            <table {...getTableProps()}>
                <thead>
                    {headerGroups.map(headerGroup => (
                        <tr {...headerGroup.getHeaderGroupProps()}>
                            {headerGroup.headers.map(column => (
                                <th {...column.getHeaderProps()}>{column.render("Header")}</th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody {...getTableBodyProps()}>
                    {rows.map((row, i) => {
                        prepareRow(row);
                        return (
                            <tr {...row.getRowProps()}>
                                {row.cells.map(cell => {
                                    return <td {...cell.getCellProps()}>{cell.render("Cell")}</td>;
                                })}
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </React.Fragment>

    );

}
export default UserManagerTable;




//LEGACY CODE FOR REFERENCE

// // Using useEffect to call the API once mounted and set the data
  // useEffect(() => {
  //   (async () => {
  //     const jwtToken = localStorage.getItem('jwt').replace('"', '')
  //     fetch('http://api.localhost/api/User', {
  //       method: 'GET',
  //       headers: {
  //         Authorization: 'Bearer ' + jwtToken
  //       }
  //     }).then(result => setData(result.data))
  //     // setData(await result.json())
  //   })();
  // }, []);

  //Tables/Data
  // const [data, setData] = useState([]);

  // //Yes, I know it's scuffed. Can't specify a dependency without creating a infinite loop or stuff breaking in weird ways
  // useEffect(() => {
  //   handleGenerateUsers()
  // }, [])// eslint-disable-line react-hooks/exhaustive-deps

  // const handleGenerateUsers = async (event) => {
  //   async function requestUsers() {
  //     const jwtToken = localStorage.getItem('jwt').replace('"', '')
  //     return fetch('http://api.localhost/api/User', {
  //       method: 'GET',
  //       headers: {
  //         Authorization: 'Bearer ' + jwtToken
  //       }
  //     }).then(response => response.json())

  //   }
  //   let response = await requestUsers()
  //   setData(response)
  //   UpdateTable(response)
  // };

  // const UpdateTable = async (gebruikers) => {
  //   // let gebruikers = data
  //   let tablebody = document.getElementById("UsersTableBody");

  //   // Clear existing table
  //   var rowCount = tablebody.rows.length;
  //   var counter = 0;
  //   while (counter < rowCount) {
  //     tablebody.deleteRow(rowCount[counter]);
  //     counter++;
  //   }
  //   for (let Id in gebruikers) {
  //     let user = gebruikers[Id]
  //     data[Id] = user

  //     let tr = document.createElement("tr")

  //     let name_thread = document.createElement("td")
  //     name_thread.textContent = user.userName
  //     tr.appendChild(name_thread)

  //     let id_thread = document.createElement("td");
  //     id_thread.textContent = user.id;
  //     tr.appendChild(id_thread);

  //     tablebody.prepend(tr)
  //   }
  //   console.log(data)

  // }