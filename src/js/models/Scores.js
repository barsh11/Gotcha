export default class Scores{
    constructor(final){
        this.final=[];
    }
    checkWinner(){
        if(this.final[0] > this.final[1]){
            return 0;
        } else if(this.final[0] < this.final[1]){
            return 1;
        }
        return -1;
    }
}