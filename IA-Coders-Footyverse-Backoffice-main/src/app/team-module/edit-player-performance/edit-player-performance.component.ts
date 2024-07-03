import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { StatsService } from 'src/app/services/stats.service';
import { Stats } from 'src/models/Stats';

@Component({
  selector: 'app-edit-player-performance',
  templateUrl: './edit-player-performance.component.html',
  styleUrls: ['./edit-player-performance.component.css']
})
export class EditPlayerPerformanceComponent {

  editPlayerPerformanceForm: FormGroup = new FormGroup({
    weakness: new FormControl(),
    strength: new FormControl(),
    matchesPlayed: new FormControl(),
    fouls: new FormControl(),
    penaltiesCommitted: new FormControl(),
    minutes: new FormControl(),
    yellowCards: new FormControl(),
    redCards: new FormControl(),
    interceptions: new FormControl(),
    tackles: new FormControl(),
    possessionWon: new FormControl(),
    ballsRecovered: new FormControl(),
    goals: new FormControl(),
    assists: new FormControl(),
    shotsOnTarget: new FormControl(),
    passesCompleted: new FormControl()
  });

  editedPlayerStats: Stats;
  idPlayer: string;

  constructor(
    private statsService: StatsService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      this.idPlayer = params['idPlayer'];
    });

    this.statsService.getStatByPlayerId(this.idPlayer).subscribe((response: any) => {
      this.editedPlayerStats = response;
      this.editPlayerPerformanceForm.patchValue(this.editedPlayerStats);
    });
  }

  onSubmit(): void {
    if (this.editPlayerPerformanceForm.valid) {
      const updatedStats: Stats = { ...this.editPlayerPerformanceForm.value, _id: this.editedPlayerStats._id };
      this.statsService.updateStat(updatedStats).subscribe(() => {
  
        console.log('Player performance updated successfully', updatedStats);
        this.router.navigate(['/team/player-details/', this.idPlayer]);
      }, error => {
        console.error('Failed to update player performance:', error);
      });
    } else {
      console.error('Invalid form data');
    }
  }
}



