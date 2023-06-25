# BRANCH DATA STRUCURE
## RULES

* Node class takes only data as parameter
```
class Node {
    constructor(data){
        this.data = data
        this.next = null
    }
}
```

### Structure

- the structure have a singly linked list data structure 
- for each node might or might not have a childern it depends on the user preferance

### Appending Data To The List

- say that user constructs a branch with two childern

    - the node which carries a childern will have only one child property
    - while the user appends a child node it appends to the last item of the childeren list. The appending method will be as follows
    - the Append method append() will append if only data is given as parameter.
        - but if in the append method specified parent data and new data it will append the data as a child to a given parent node data given to at the last of the childerens list if the parent have any.

        - if not it will create one.

    ```
    //To append Data as Child

    const list = new Branch()
    const child_data = 'i am child node'
    list.append({
        node : parent_node,
        data : child_data,
    })
    ```
    - to append to the list 
    ```
    const next_node = 'I am Next Node'
    list.append({
        data : next_node
    })
    ```
### Searching Data From The List

- search() method is used to search items in the list
- it returns false if the item is not on the list.
```
const list = new Branch()
list.append('i am node')
list.search('i am node') // Node{data : 'i am node',next:null}
list.search(query) //false
```
