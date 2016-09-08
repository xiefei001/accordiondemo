import {Component, ContentChildren, QueryList, AfterContentInit, ViewChild} from "@angular/core";
import {SlideComponent} from "./slide.component";
import {LoginComponent} from "../login/login.component";


enum Direction {
  Left,
  Right
}

@Component({
  selector: 'carousel',
  templateUrl: 'app/carousel/carousel.component.html'
})
export class CarouselComponent implements AfterContentInit {

  SWIPE_ACTION = {LEFT: 'swipeleft', RIGHT: 'swiperight'};

  @ContentChildren(SlideComponent)
  public slides: QueryList<SlideComponent>;


  private currentIndex: number = 0;
  private handledIndex: number = 0;

  ngAfterContentInit(): void {
    this.slides.forEach((slide, index, arr)=> {
      if (index == this.currentIndex) {
        this.slideActive(slide, Direction.Left);
      }
    });
  }


  swipe(action: string = this.SWIPE_ACTION.RIGHT) {
    console.log("action: " +action);
    //prev
    if (action === this.SWIPE_ACTION.RIGHT) {
      this.select(this.currentIndex - 1);
    }
    //next
    if (action === this.SWIPE_ACTION.LEFT) {
      this.select(this.currentIndex + 1);
    }
  }


  public select(ind: number): void {
    let direction: Direction = Direction.Right;
    if (this.currentIndex < ind) {
      direction = Direction.Left;
    }


    this.slides.forEach((slide, index, arr)=> {
      if (ind === index) {
        this.slideActive(slide, direction);
      } else if (index === this.currentIndex) {
        console.log("index ist nun inactive" + index);
        this.slideInactive(slide, direction);
      }
    });
    this.currentIndex = ind;
    console.log("currentIndex: " + this.currentIndex);

  }

  slideActive(slide: SlideComponent, direction: Direction): void {
    if (direction == Direction.Left) {
      setTimeout(()=> {
        slide.hasLeft = false;
        slide.hasNext = false;
        slide.active = true;
      }, 600);
      slide.hasNext = true;

      setTimeout(()=> {
        slide.hasLeft = true;
      }, 0);
    } else if (direction == Direction.Right) {
      setTimeout(()=> {
        slide.hasPrev = false;
        slide.hasRight = false;
        slide.active = true;
      }, 600);
      slide.hasPrev = true;

      setTimeout(()=> {
        slide.hasRight = true;
      }, 0);
    }
  }

  slideInactive(slide: SlideComponent, direction: Direction) {
    if (direction == Direction.Left) {
      setTimeout(()=> {
        slide.hasLeft = false;
        slide.active = false;
      }, 600);
      slide.hasLeft = true;
    } else if (direction == Direction.Right) {
      setTimeout(()=> {
        slide.hasRight = false;
        slide.active = false;
      }, 600);
      setTimeout(()=> {
        slide.hasRight = true;
      });
    }
  }

  previous() {
    console.log("currentIndex : " + this.currentIndex);
    if (this.currentIndex == 1) {
      this.select(0);
    } else {
      this.select(1);
    }
  }

  next() {
    this.select(this.currentIndex + 1);
  }
}
