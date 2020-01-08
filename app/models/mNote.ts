import iModel from "./iModel";
class Note {
    public title: string = "";
    
}

class Location {
    public road: string = "";
    public city: string = "";

}

class mNote implements iModel {
    // notes : [{String:String}]
    public ClassName = 'mNote';
    public username = "pop";
    public notes: Note[] = [
                 { title: 'a' },
                 { title: 'b' },
                 { title: 'c' }   
             ];
    public location: Location = {
                road : 'samakee',
                city : 'nontaburi'         
            };
}


// const mNote = {
//     ClassName : 'mNote',
//     location : {
//         road : 'samakee',
//         city : 'nontaburi'         
//     },
//     username : 'pop',
//     notes: [
//         { title: 'a' },
//         { title: 'b' },
//         { title: 'c' }   
//     ]
// }



//export default cNote
export default mNote