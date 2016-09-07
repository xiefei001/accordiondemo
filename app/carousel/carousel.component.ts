import {Component, ContentChildren, QueryList, AfterContentInit} from "@angular/core";
import {SlideComponent} from "./slide.component";


enum Direction {
  Left,
  Right
}

@Component({
  selector: 'carousel',
  templateUrl: 'app/carousel/carousel.component.html'
})
export class CarouselComponent implements AfterContentInit {

  @ContentChildren(SlideComponent)
  public slides: QueryList<SlideComponent>;
  //private slides: Array<SlideComponent>;

  private currentIndex: number = 0;

  ngAfterContentInit(): void {
    this.slides.forEach((slide, index, arr)=> {
      if (index == this.currentIndex) {
        this.slideActive(slide, Direction.Left);
      }
    });
  }

  public select(ind: number): void {
    let direction: Direction = Direction.Left;
    if (this.currentIndex < ind) {
      direction = Direction.Right;
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
      slide.hasLeft = true;
      slide.hasNext = true;
    } else if (direction == Direction.Right) {
      setTimeout(()=> {
        slide.hasPrev = false;
        slide.hasRight = false;
        slide.active = true;
      }, 600);
      slide.hasPrev = true;

      setTimeout(()=> {
        slide.hasRight = true;
      });
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
      slide.hasRight = true;
    }
  }

  previous(){
    console.log("currentIndex : " + this.currentIndex);
    if (this.currentIndex == 1) {
      this.select(0);
    } else {
      this.select(1);
    }
  }
}
