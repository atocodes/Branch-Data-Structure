class Node{
    constructor(data){
        this.data = data
        this.next = null
        this.prev = null
    }
}

class Branch{
    constructor(){
        this.head = null
    }
    get is_empty(){
        return this.head === null
    }
    
    append({id,parent,data}){
        const node = new Node(data)
        const is_empty = this.is_empty
        let count = 1
        if(id)console.log('ID:',id,'\n','Data:',data);else if(parent)console.log('Parent:',parent,'\n','Data:',data);
        
        if(is_empty){
            console.log(`%c Got First Head \n\t\t Node Branch => ${data} : SUCCESS ✔`,'color : blueviolet')
            node.id = 0
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
                child_id = nums[nums.length-1]

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
                    node.id = count
                    return current.next = node
                }
            }
            count+=1
            current = current.next
        }
    }

    search({id,data,node}){
        let n = this.head
        const datas = []
        if(node)n=node
        if(data && id)return 'Either Data Or ID not both searching available for now'
        while(n){
            if(id && n.id === id)return n
            if(data && n.data === data){
                datas.push(n)
                return n
            }

            if(n.child){
                let s2 = this.search({data:data,node:n.child})
                if(id)s2 = this.search({id:id,node:n.child})
                if(s2)return s2
            }
            n = n.next
        }
        return false
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
console.log('')

console.log(b)


