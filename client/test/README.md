##  immutability
    The state tree
      √ is immutable

Applying an operation on it involves producing a new state tree, leaving the previous one untouched. If the state tree is a Map with a key 'contacts' that contains a List of contacts, adding a contact means we need to create a new Map, where the contacts key points to a new List.

## application logic
    setContacts
      √ adds the contacts to the state

the application allows "loading in" a collection of users. We could have a function called setContacts that takes a previous state and a collection of entries and produces a state where the entries are included. 

## application logic
    setContacts
      √ converts to immutable

The list of contacts to load could also be a regular javaScript array

##  DetailRow
    √ double-click on contact data selects it for editing

The detail view of the left on the screen shows properties of the selected contact, double clicking any row with set the property ready for an edition in situ.

##  ContactFilter
    √ clicking on keypad filters list of contacts

Using the letter keypad should filter the list of contacts present on the app.

##  DetailRow
    √ calls a callback when pressing enter
    √ calls a callback when pressing escape or losing focus

The input fields shown when detail row is in edit mode got 3 handles. 
1. When the field loses focus (onBlur) the editing is canceled.
2. When  the scape key is accioned while an input field is in focus, the cancelEdiding action is triggered.
3. Pressing enter when on an input fields saves changes, if any.

##  ListRow
    √ renders an item
    √ invokes callback when the delete button is clicked
    √ invokes callback when the list item image is clicked

Test acctions withing the contacts list. Seleccton should occur when click on image, amd when hovering over an item, the delete button should appear. Selecting it should delete item from the list and the database.

