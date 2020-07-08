import { Component, OnInit } from '@angular/core';
import {YoutubeService} from '../youtube.service';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {DomSanitizer} from '@angular/platform-browser';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-youtube-player',
  templateUrl: './youtube-player.component.html',
  styleUrls: ['./youtube-player.component.css']
})
export class YoutubePlayerComponent implements OnInit {
  song: any;
  sub: Subscription;
  constructor(
    private youtubeService: YoutubeService,
    private activatedRouter: ActivatedRoute,
    private domSanitizer: DomSanitizer
  ) { }
  // tslint:disable-next-line:typedef
  ngOnInit() {
    this.sub = this.activatedRouter.paramMap.subscribe((paramMap: ParamMap) => {
      const id = paramMap.get('id');
      this.song = this.youtubeService.find(id);
    });
  }
  // tslint:disable-next-line:typedef
  getSrc() {
    const url = 'https://www.youtube.com/embed/' + this.song.id;
    return this.domSanitizer.bypassSecurityTrustResourceUrl(url);
  }

  // tslint:disable-next-line:use-lifecycle-interface typedef
  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
