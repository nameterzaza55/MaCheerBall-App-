import { user } from './user';

export class poll {
    pollId: string;
    homeTeamName: string;
    awayTeamName: string;
    dateBall:string;
    timeBall: string;
    timeEndBall:string;
    scoreBall:string;
    voteHomeTeam:user[];
    voteAwayTeam:user[];
    pollStatus:string;
    luckyName:string;
    luckyTel:string;
}