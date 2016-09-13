import {Component, ContentChildren, QueryList, AfterContentInit, ViewChild, ElementRef, NgZone} from "@angular/core";
import {SlideComponent} from "./slide.component";
import {LoginComponent} from "../login/login.component";


enum Direction {
  left,
  right
}

enum Type {
  next,
  prev
}

@Component({
  selector: 'carousel',
  templateUrl: 'app/carousel/carousel.component.html'
})
export class CarouselComponent implements AfterContentInit {

  SWIPE_ACTION = {LEFT: 'swipeleft', RIGHT: 'swiperight'};

  @ContentChildren(SlideComponent)
  public slides: QueryList<SlideComponent>;
  private nativeElement: any;

  constructor(private elementRef: ElementRef, private zone: NgZone) {
    this.nativeElement = elementRef.nativeElement;
  }

  private currentIndex: number = 0;
  private handledIndex: number = 0;

  ngAfterContentInit(): void {
    this.slides.forEach((slide, index, arr)=> {
      if (index == this.currentIndex) {
        this.slideActive(slide, Direction.left);
      }
    });
  }


  swipe(action: string = this.SWIPE_ACTION.RIGHT) {
    console.log("action: " + action);
    //prev
    if (action === this.SWIPE_ACTION.RIGHT) {
      this.slide(Type.prev);
    }
    //next
    if (action === this.SWIPE_ACTION.LEFT) {
      //this.select(this.currentIndex + 1);
      this.slide(Type.next);
    }
  }

  public slide(type: Type): void {
    var slidesArr: SlideComponent[] = this.slides.toArray();
    let active = slidesArr[this.currentIndex];
    let nextIdx: number;
    let direction: Direction;
    if (type == Type.next) {
      nextIdx = this.currentIndex + 1;
      if (nextIdx == slidesArr.length) {
        nextIdx = 0;
      }
      direction = Direction.left;
    } else {
      nextIdx = this.currentIndex - 1;
      if (nextIdx < 0) {
        nextIdx = slidesArr.length - 1;
      }
      direction = Direction.right;
    }

    let next = slidesArr[nextIdx];

    this.slideTransition(type, direction, active, next);
    this.currentIndex = nextIdx;
  }

  private slideTransition(type: Type, direction: Direction, active: SlideComponent, next: SlideComponent) {
    if (type == Type.next) {

      next.setClass("next", true);
      next.nativeElement.offsetWidth; // force reflow;

      active.setClass("left", true);
      next.setClass("left", true);

      setTimeout(()=> {
        next.setClass("left", false);
        next.setClass("next", false);
        next.setClass("active", true);

        active.setClass("active", false);
        active.setClass("left", false);
      }, 600);
    } else {
        next.setClass("prev", true);
        next.nativeElement.offsetWidth; // force reflow;

        active.setClass("right", true);
        next.setClass("right", true);

      setTimeout(()=> {
        next.setClass("right", false);
        next.setClass("prev", false);
        next.setClass("active", true);

        active.setClass("active", false);
        active.setClass("right", false);
      }, 600);
    }
  }


  public select(ind: number): void {
    let direction: Direction = Direction.right;
    if (this.currentIndex < ind) {
      direction = Direction.left;
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
    if (direction == Direction.left) {
      setTimeout(()=> {
        slide.hasLeft = false;
        slide.hasNext = false;
        slide.active = true;
      }, 600);
      slide.hasNext = true;

      setTimeout(()=> {
        slide.hasLeft = true;
      }, 0);
    } else if (direction == Direction.right) {
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
    if (direction == Direction.left) {
      setTimeout(()=> {
        slide.hasLeft = false;
        slide.active = false;
      }, 600);
      slide.hasLeft = true;
    } else if (direction == Direction.right) {
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
