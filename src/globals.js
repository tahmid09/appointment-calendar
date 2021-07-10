//prefixes of implementation that we want to test
//window.indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;

//prefixes of window.IDB objects
//window.IDBTransaction = window.IDBTransaction || window.webkitIDBTransaction || window.msIDBTransaction;
//window.IDBKeyRange = window.IDBKeyRange || window.webkitIDBKeyRange || window.msIDBKeyRange

if (!window.indexedDB) {
    window.alert("Your browser doesn't support a stable version of IndexedDB.")
}


var db;
var request = window.indexedDB.open("newDatabase", 1);

request.onerror = function (event) {
    console.log("error: ");
};

request.onsuccess = function (event) {
    db = request.result;
    console.log("success: " + db);
  //  loadTable();
};

request.onupgradeneeded = function (event) {
    var db = event.target.result;
    var objectStore = db.createObjectStore("appointment", {
        keyPath: "time"
    });

    // for (var i in employeeData) {
    //     objectStore.add(employeeData[i]);
    // }
}



export const  idbAddItem = item => {
 var valuee = []
    var request = db.transaction(["appointment"], "readwrite")
        .objectStore("appointment")
        .add(item);
    request.onsuccess = function (event) {
       console.log(event.target.result)
      
    };
    request.onerror =  (event) => {
        alert("error");
   
    }
    
    
    
    return valuee
}

export const  loadTable =() => {
    var employees = "";
   
    var objectStore = db.transaction("appointment").objectStore("appointment");
    console.log(objectStore, 'sssssssssssssssssssssss')



}

export const getAllAppointment  = () => {
    const txn = db.transaction('appointment', "readonly");
    const objectStore = txn.objectStore('appointment');
   let appointmentList = ""
    objectStore.openCursor().onsuccess = (event) => {
        let cursor = event.target.result;
        if (cursor) {
            let contact = cursor.value;
            console.log(contact)
            appointmentList = appointmentList.concat(cursor.value)
           
            // continue next record
            cursor.continue();
        }
    };
    console.log(appointmentList, 'wwwwwwwwwwwww');
    
    // close the database connection
    txn.oncomplete = function () {
        db.close();
    };

    return appointmentList
}


export const getAppointmentById = (time) => {
    const txn = db.transaction('appointment', 'readonly');
    const store = txn.objectStore('appointment');

    let query = store.get(time);

    query.onsuccess = (event) => {
        if (!event.target.result) {
            console.log(`The contact with ${time} not found`);
        } else {
            console.table(event.target.result);
        }
    };

    query.onerror = (event) => {
        console.log(event.target.errorCode);
    }

    txn.oncomplete = function () {
        db.close();
    };
};


export const getAppointmentValue = (colum, value) => {
    const txn = db.transaction('Contacts', 'readonly');
    const store = txn.objectStore('Contacts');

    // get the index from the Object Store
    const index = store.index(colum);
    // query by indexes
    let query = index.get(value);

    // return the result object on success
    query.onsuccess = (event) => {
        console.log(query.result); // result objects
    };

    query.onerror = (event) => {
        console.log(event.target.errorCode);
    }

    // close the database connection
    txn.oncomplete = function () {
        db.close();
    };
}