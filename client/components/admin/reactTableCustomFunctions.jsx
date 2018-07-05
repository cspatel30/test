export const _createFiltersQueryString = (filtered) => {
    let queryString = '';
    filtered.map((item)=>{
        if(queryString){
            queryString +=  '&';
        }
        let id = item.id;
        id = id.replace(/>/g , "_");
        queryString += id + '=' + item.value
    });
    return queryString;
}

export const toggleRow = (id, selected, selectOnlyOneRecord) =>{
    let newSelected = Object.assign({}, selected);
    newSelected[id] = !selected[id];

    if(newSelected[id] == false){
        delete newSelected[id];
    }
    if(selectOnlyOneRecord){
        newSelected = {};
        newSelected[id] = !selected[id];
    }
    let returnRowObject =  {
        selected: newSelected,
        selectAll: 2
    };

    if(selectOnlyOneRecord){
        selectOnlyOneRecord.forEach(x => {
           if(x.id == id && !selected[id]){
               returnRowObject.selectedUserData = x;
               return;
           }

        });

    }
    return returnRowObject;
}

export const toggleSelectAll = (selectAll, rows) => {
    let newSelected = {};

    if (selectAll === 0) {
        rows.forEach(x => {
            newSelected[x.id] = true;
        });
    }

    return({
        selected: newSelected,
        selectAll: selectAll === 0 ? 1 : 0
    });

}


export const  _createSortedDataString = (id, sorted) => {
    id = id.replace(/>/g , ".");
    let value = sorted?"desc":"asc";
    return "sort="+value+"&field="+id;
}

export const  _removeColumnsIfNotNeeded = (columnsList, removeColumnsFromGrid) => {

    if(removeColumnsFromGrid && removeColumnsFromGrid.length>0){
        let index = 0;
        columnsList.forEach((items)=>{
            if(items && items.id && removeColumnsFromGrid.indexOf(items.id)>-1){
                delete columnsList[index];
            }

            index++;
        });
    }

    return columnsList;
}

export const _selectNewRecordsIfAllSelected = (objArray, newObject) => {

    let selectedObjects = newObject;

    objArray.map((a) => {
        selectedObjects[a.id] = true;
        return a.id
    });
    return selectedObjects;
}

export const _getDeafultColumnsWidth = (newSettings) => {
    let defaultSettings = {
        minWidth: 100,
        maxWidth: 500,
    };

    if(newSettings && newSettings.minWidth){
        defaultSettings.minWidth = newSettings.minWidth;
    }


    return defaultSettings;
}