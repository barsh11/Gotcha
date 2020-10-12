export default class Scores{
    constructor(final){
        this.final=[];
    }
    checkWinner(){
        return (this.final[0] > this.final[1]) ? 0 : 1;
    }
}