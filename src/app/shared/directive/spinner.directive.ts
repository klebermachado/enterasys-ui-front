import { Directive, ElementRef, Input } from '@angular/core';

@Directive({
  selector: '[appSpinner]',
  standalone: true,
})
export class SpinnerDirective {
  @Input() appSpinner = false;
  @Input() loadingText: undefined | string = undefined;
  private originalText = '';
  private replaceText = '';
  private backdrop =
    '<div class="absolute inset-0 bg-white opacity-50 !cursor-not-allowed"></div>';

  private svgLeft = `
		<svg aria-hidden="true" id="spinner"
			class="absolute left-2 bottom-[calc(50%-8px)] w-4 h-4 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
			viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
			<path
				d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
				fill="currentColor" />
			<path
				d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
				fill="currentFill" />
		</svg>
	`;
  private svgCenter = `
		<svg aria-hidden="true" id="spinner"
			class="absolute left-[calc(50%-8px)] bottom-[calc(50%-8px)] w-4 h-4 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
			viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
			<path
				d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
				fill="currentColor" />
			<path
				d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
				fill="currentFill" />
		</svg>
	`;
  constructor(private el: ElementRef) {
    this.el.nativeElement.classList.add('px-8');
  }

  ngOnChanges(change: any) {
    if (change?.loadingText?.firstChange) {
      this.getOriginalText();
      this.getReplaceText();
    }

    if (change.appSpinner.currentValue === true) {
      this.changeStateTextIfPossible();
      this.disableWhenButton();
      this.addSpinnerSvg();
    } else {
      this.rollbackText();
      this.enableWhenButton();
      this.removeSpinnerSvg();
    }
  }

  getOriginalText() {
    const content = this.el.nativeElement.innerHTML;
    this.originalText = content;
  }

  getReplaceText() {
    if (!this.loadingText) {
      this.replaceText = this.el.nativeElement.innerHTML;
    } else {
      this.replaceText = this.loadingText;
    }
  }

  changeStateTextIfPossible() {
    this.el.nativeElement.innerHTML = this.replaceText;
    if (this.loadingText === '') {
      this.el.nativeElement.classList.add('!text-transparent');
    }
  }

  rollbackText() {
    this.el.nativeElement.innerHTML = this.originalText;
    if (this.loadingText === '') {
      this.el.nativeElement.classList.remove('!text-transparent');
    }
  }

  disableWhenButton() {
    if (this.el.nativeElement.tagName === 'BUTTON') {
      this.el.nativeElement.setAttribute('disabled', 'true');
      this.el.nativeElement.innerHTML += this.backdrop;
    }
  }

  enableWhenButton() {
    if (this.el.nativeElement.tagName === 'BUTTON') {
      this.el.nativeElement.removeAttribute('disabled');
      this.el.nativeElement.innerHTML = this.el.nativeElement.innerHTML.replace(
        this.backdrop,
        ''
      );
      this.el.nativeElement.classList.remove('!cursor-not-allowed');
    }
  }

  addSpinnerSvg() {
    this.el.nativeElement.classList.add('relative');
    if (this.loadingText === '') {
      this.el.nativeElement.innerHTML += this.svgCenter;
    } else {
      this.el.nativeElement.innerHTML += this.svgLeft;
    }
  }

  removeSpinnerSvg() {
    let svg;
    if (this.loadingText === '') {
      svg = this.svgCenter;
    } else {
      svg = this.svgLeft;
    }
    this.el.nativeElement.classList.remove('relative');
    this.el.nativeElement.innerHTML = this.el.nativeElement.innerHTML.replace(
      svg,
      ''
    );
  }
}
