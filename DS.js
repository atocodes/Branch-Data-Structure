class Node{
    constructor(data){
        this.data = data
        this.next = null
        this.prev = null
        this.id = null
    }
}

class Branch{

    constructor(){
        this.head = null
    }
    
    get is_empty(){
        return this.head === null
    }

    get size(){
        const all = this.traversal({data:'*'})
        return all.length
    }

    append({id,parent,data}){
        const node = new Node(data)
        const is_empty = this.is_empty
        let count = 1
        if(id)console.log('ID:',id,'\n','Data:',data);else if(parent)console.log('Parent:',parent,'\n','Data:',data);
        
        if(is_empty){
            console.log(`%c Got First Head \n\t\t Node Branch => ${data} : SUCCESS ✔`,'color : blueviolet')
            node.id = '0'
            return this.head = node
        }

        let current = this.head

        const path_viewer = (branch) =>{
            let path = branch
            let arr = []

            while(path){
                arr.push(path.data)
                path = path.prev
            }
            arr.reverse()
            arr = arr.map((node,index) =>{
                if(node === branch.data){
                    return `=> ${node.toUpperCase()}`
                }
                if(index > 0){
                    return `-> ${node.toUpperCase()}`
                }
                return node.toUpperCase()
            })
            arr = arr.join('')
            return arr
        }

        const console_view = ({parent,node,child=true,new_child=true}) =>{
            if(child){
                if(new_child){
                    console.log(`%cPARENT NODE => ${parent.data}\n\tGot New \n\t\t CHILD NODE => ${data} : SUCCESS ✔`,'color : green')
                }else{
                    console.log(`%cPARENT NODE => ${parent.data}\n\tGot Additional New \n\t\t CHILD NODE => ${data} : SUCCESS ✔`,'color : blue')
                }
            }else{
                console.log(`%cBRANCH \n\tGot Additional New \n\t\t Next NODE => ${data} : SUCCESS ✔`,'color : blue')
            }

            const p = path_viewer(node)
            console.log(`%cPATH: ${p}`,'color:gray')
            console.log(parent)
        }

        const make_node = ({parent,new_node}) =>{
            let parent_id = parent.id
            if(parent.child){
                let s = parent.child
                let child_id
                const nums = s.id.replace(/-/,' ').split('').map(e => parseInt(e))
                child_id = +nums[nums.length-1]

                while(s){
                    if(s.next == null){
                        new_node.id = `${parent_id}${child_id+1}` 
                        new_node.prev = s
                        console_view({parent:parent,node:new_node,new_child:false}) //* CONSOLE VIEW
                        return s.next = new_node
                    }
                    child_id+=1
                    s = s.next
                }
                return s.next = new_node
            }else{
                new_node.prev = parent
                new_node.id = `${parent_id}0`
                console_view({parent:parent,node:new_node,new_child:true}) //* CONSOLE VIEW
                return parent.child = new_node
            }
        }

        while(current){
            if(parent || id){
                // ? Here if the user want to append child by id then all the searching will be done and send it to make_node() method
                const searchingByID = this.search({id:id})
                if(parent && current.data === parent) return make_node({parent : current,new_node : node})
                if(id && searchingByID.id === id)return make_node({parent:searchingByID,new_node:node})

                let c_child
                if(current.child)c_child = current.child;
                if(c_child){
                    const o = this.search({data : parent, node : c_child})
                    if(o){
                        current = o
                        continue
                    }
                }
            }else{
                if(!current.next){
                    node.prev = current
                    console_view({parent:node.prev,node:node,child:false})//* CONSOLE VIEW
                    node.id = `${count}`
                    return current.next = node
                }
            }
            count+=1
            current = current.next
        }
    }

    insert({id,position,node}){
        if(id)var parent =this.search({id:id})

        const new_node = new Node(node)

        let pose = 0
        let child 
        
        if(id && parent.child){
            child = parent.child
        }else if(id && !parent.child){
            child = parent
        }else if(!id && position){
            child = this.head
        }

        let prev_child

        while(child){
            if(position === 0){
                prev_child = child
            }
            pose += 1
            if(position > 0 && pose === position){
                prev_child = child
            }
            child = child.next
        }
        
        let _id = prev_child.id.split('')   
        _id[_id.length - 1] = `${pose}`
        _id = _id.join('')
        new_node.id = _id
        
        if(!id)new_node.id = `${+new_node.id + 1}`
        
        if(position > 0){

            new_node.prev = prev_child
            new_node.next = prev_child.next
            if(prev_child.next)prev_child.next.prev = new_node
            prev_child.next = new_node
        }else if(position === 0 || !parent.child){

            let child_node
            if(parent.child){
                child_node = parent.child
                child_node.prev = new_node

                new_node.next = child_node
                new_node.prev = parent

                parent.child = new_node
            }else{
                new_node.prev = parent.prev
                new_node.id = parent.id + '0'
                parent.child = new_node
            }
        }
       return
    }

    search({id,data,node}){
        // ? O(n) =>The time taking depends on the size of the data
        // ? Linear Search algorythm.

        // * If searching method is by data.
        // * and if there is a multiple same data names 
        // * it will return the first data that matches. 
        let n = this.head
        if(node)n=node
        if(data && id)return 'Either Data Or ID not both searching available for now'

        while(n){

            if(id && n.id === id)return n
            if(data && n.data === data)return n
            
            if(n.child){

                let s2 = this.search({data:data,node:n.child})
                if(id)s2 = this.search({id:id,node:n.child})
                if(s2)return s2 
            }

            n = n.next
        }
        return false
    }
    
    // todo: Note TRAVERSAL means to print every nodes in the list.

    traversal({data,node}){
        const searchResult = []

        let current = this.head
        if(node)current = node
        while(current){
            if(current.data === data){
                searchResult.push(current)
            }else if(data === '*'){
                searchResult.push(current)
            }

            if(current.child){
                const s2 = this.traversal({data:data,node:current.child})
                searchResult.push(...s2)
            }

            current= current.next
        }

        return searchResult
    }

    remove({id}){
        // !REMOVING BY ID
        let node = this.search({id:id})
        if(node){
            let prev = node.prev
            const nxt = node.next

            prev = this.search({id:prev.id})
            if(prev.next.data === node.data){
                console.log(node)
                console.log(`%cRemoving Next\n DATA: ${node.data} \n\tID: #${node.id} = SUCCESS ✔`,'color:orange')
                return prev.next = node.next
            }else if(prev.child.data === node.data){
                console.log(`%cRemoving Child\n DATA: ${node.data} \n\tID: #${node.id} = SUCCESS ✔`,'color:orange')
                return prev.child = nxt
            }
        }

        return '%cSOMETHING IS WRONG','color:red'
    }

    get deleteHead(){
        console.log('%cDeleting HEAD : SUCCESS ✔','color : orange')
        return this.head = this.head.next
    }

    isPresent({data}){
        const search = this.traversal({data:data})
        if(search){
            return {
                status : true,
                length : search.length
            }
        }else{
            return false
        }
    }

    sorted(){
        const datas = this.traversal({data:'*'})
        let sorted = []

        for(let data of datas){
            sorted.push(+data.id)
        }
        sorted.sort((a,b)=>{
            if(a > b)return 1
            if(a < b)return -1
            return 0
        })
        sorted = sorted.map(id =>{
            let _id = `${id}`
            const search_by_id = this.search({id:_id})
            return search_by_id
        })
        return sorted
    }
    
    set eadit({id,new_data}){
        const node = this.search({id:id})
        if(!node || !id)return false
        return node.data = new_data
    }

    binarySearch({id,nodes}){
        let arr = this.sorted().map(node => +node.id)
        if(nodes)arr = nodes
        let mid = Math.floor(arr.length / 2)
        let res
        if(arr[mid] === +id){
            return arr[mid]
        } 
       if(arr[mid] < +id){
            return this.binarySearch({id : id, nodes : arr.slice(mid,arr.length)})
       }else if(arr[mid] > +id){
            return this.binarySearch({id : id, nodes : arr.slice(0,mid)})
       }
       
    }
}

const b = new Branch()
b.append({data:'root'})
b.append({data:'cs'})

// ? CS
b.append({parent:'cs',data:'phd'})
b.append({parent:'cs',data:'pro'})

// ! APPENDING BY ID
// ? CS -> PHD
b.append({id:'10',data:'stud1'})
b.append({id:'10',data:'stud2'})
b.append({id:'10',data:'stud3'})

// ! APPENDING BY PARENT NAME
// ? CS -> PHD -> STUD1
b.append({parent:'stud1',data:'name1'})
b.append({parent:'stud1',data:'paper1'})
// ? CS -> PHD -> STUD1 -> PAPER1
b.append({parent:'paper1',data:'paper11'})

// ? CS -> PHD -> STUD1 -> PAPER1 -> title
b.append({id:'1001',data:'title'})

// ? CS -> PHD -> STUD1 -> PAPER1 -> author
b.append({parent:'paper11',data:'author'})

// ? CS -> PHD -> STUD2 -> NAME2
b.append({parent:'stud2',data:'name2'})

// ? CS -> PHD -> STUD3 -> NAME3
b.append({parent:'stud3',data:'name3'})

// ? CS -> PHD -> STUD3 -> PAPER2
b.append({parent:'stud3',data:'paper2'})

// ? CS -> PHD -> STUD3 -> PAPER2 -> PAPER3
b.append({parent:'paper2',data:'paper3'})

// ? CS -> PHD -> STUD3 -> PAPER2 -> PAPER3 -> PAPER4
b.append({parent:'paper3',data:'paper4'})

// ? CS -> PHD -> STUD3 -> PAPER2 -> PAPER3 -> PAPER4 -> Title
b.append({parent:'paper4',data:'title1'})

// ? CS -> PHD -> STUD3 -> PAPER2 -> PAPER3 -> PAPER4 -> Title
b.append({parent:'paper4',data:'author'})



// ? CS -> PRO -> PRO1
b.append({parent:'pro',data:'pro1'})

// ? CS -> PRO -> PRO2
b.append({parent:'pro',data:'pro2'})

// ? CS -> PRO -> PRO1 -> NAME01
b.append({parent:'pro1',data:'name01'})

// ? CS -> PRO -> PRO1 -> PAPER01
b.append({parent:'pro1',data:'paper01'})

// ? CS -> PRO -> PRO1 -> PAPER01 -> PAPER002
b.append({parent:'paper01',data:'paper002'})

// ? CS -> PRO -> PRO1 -> PAPER01 -> PAPER002 -> TITLE01
b.append({parent:'paper002',data:'title01'})

// ? CS -> PRO -> PRO2 -> NAME02
b.append({parent:'pro2',data:'name02'})

// ? CS -> PRO -> PRO2 -> PAPER02
b.append({parent:'pro2',data:'paper02'})


// !NEXT
b.append({data:'c'})
b.append({parent:'c',data:'c++'})
b.append({parent:'c',data:'c#'})
b.append({parent:'c',data:'java'})
b.append({parent:'c',data:'python'})
b.append({parent:'c',data:'dart'})
b.append({parent:'java',data:'javascript'})
b.append({parent:'javascript',data:'nodejs'})
b.append({parent:'javascript',data:'nodejs'})
b.append({parent:'c',data:'nodejs'})
b.append({parent:'c#',data:'nodejs'})
b.append({data:'beamlak'})
console.log('')
const sm = b.traversal({data:'nodejs'})
console.log(sm)

// const rm = b.remove({id:'101'})
// console.log(rm)

const dh = b.deleteHead
console.log(dh)

const isP = b.isPresent({data:'javascript'})
console.log(isP)

const size = b.size
console.log(size)

console.log('')

b.insert({id:'10',node:'iStudient',position:2})
b.insert({position:1,node:'tadesse'})
console.log(b.search({id:'10011'}))

console.log('')
b.eadit = {id:'103',new_data:'eadited'}

console.log(b)

const bs = b.binarySearch({id:'11010'})
console.log(bs)
