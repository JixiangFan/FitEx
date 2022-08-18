import React from 'react'
import { GridComponent, ColumnsDirective, ColumnDirective, Resize, Sort, ContextMenu, Selection, Filter, Page, ExcelExport, PdfExport, Edit, Inject,Toolbar,Search } from '@syncfusion/ej2-react-grids';

import { groupData, contextMenuItems, groupsGrid } from '../data/dummy';
import { Header } from '../components';

const Team = () => {

  const editing = { allowDeleting: true, allowEditing: true };
  const toolbarOptions = [`Edit`, `Delete`, `Cancel`, `Copy`, 'Search'];

  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
        <Header category="Page" title="Team Lists" />
        <GridComponent
        id="gridcomp"
        dataSource={groupData}
        allowPaging
        allowSorting
        editSettings={editing}
        toolbar={toolbarOptions}
        >
          <ColumnsDirective>
            {groupsGrid.map((item, index) => <ColumnDirective key={index} {...item} />)}
          </ColumnsDirective>
          <Inject services={[Page , Toolbar, Edit, Sort, Filter, Search, Selection]} />
        </GridComponent>
    </div>
  )
}

export default Team