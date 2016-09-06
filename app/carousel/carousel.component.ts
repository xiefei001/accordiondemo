import {Component, ContentChildren, QueryList, AfterContentInit} from "@angular/core";
import {SlideComponent} from "./slide.component";
@Component({
  selector: 'carousel',
  templateUrl: 'app/carousel/carousel.component.html'
})
export class CarouselComponent implements  AfterContentInit{

  @ContentChildren(SlideComponent)
  public slides: QueryList<SlideComponent>;
  //private slides: Array<SlideComponent>;

  private currentIndex: number = 0;

  ngAfterContentInit(): void {
   this.slides.forEach((slide, index, arr)=>{
     if (index == this.currentIndex) {
        slide.active = true;
     }
   });
    console.log("lenght:" + this.slides.length);
  }
  public select(selectedSlide: SlideComponent): void {
    this.slides.forEach((slide, index, arr)=>{
      if (selectedSlide === slide) {
        slide.active = true;
      } else {
        slide.active = false;
      }
    });
  }
}
