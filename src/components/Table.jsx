import React from 'react'
import { DataGrid } from '@mui/x-data-grid';

const Table = ({ rows, columns }) => {
  return (
    <div className="w-full max-w-[1170px] mx-auto">
      <DataGrid
        rows={rows}
        columns={columns}
        autoHeight
        disableColumnFilter
        disableColumnMenu
        pageSize={10} // Number of rows per page
        pageSizeOptions={[10, 25, 50]}
         initialState={{
    pagination: { paginationModel: { pageSize: 10, page: 0 } },
  }}
        pagination
        getRowId={(row) => row._id}
        sx={{
          '& .MuiDataGrid-columnHeaders': {
            textAlign: 'center',
          },
          '& .MuiDataGrid-columnHeaderTitle': {
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          },
          '& .MuiDataGrid-cell': {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            textAlign: 'center',
          },
        }}
      />
    </div>
  );
};

export default Table;