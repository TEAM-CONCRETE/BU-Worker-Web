declare namespace daum {
  interface PostcodeOptions {
    oncomplete: (data: PostcodeData) => void;
    onresize?: (size: { width: number; height: number }) => void;
    onclose?: (state: "COMPLETE_CLOSE" | "FORCE_CLOSE") => void;
    onsearch?: (data: PostcodeData) => void;
    width?: string | number;
    height?: string | number;
    maxSuggestItems?: number;
    theme?: {
      bgColor?: string;
      searchBgColor?: string;
      contentBgColor?: string;
      pageBgColor?: string;
      textColor?: string;
      queryTextColor?: string;
      postcodeTextColor?: string;
      emphTextColor?: string;
      outlineColor?: string;
    };
    focusInput?: boolean;
    focusContent?: boolean;
    hideMapBtn?: boolean;
    hideEngBtn?: boolean;
    hideSearchBtn?: boolean;
    alwaysShowEngAddr?: boolean;
    submitMode?: boolean;
    shorthand?: boolean;
    pleaseReadGuide?: number;
    pleaseReadGuideTimer?: number;
    maxSuggestItems?: number;
    showMoreHName?: boolean;
    hideErrorMessage?: boolean;
    useBannerLink?: boolean;
  }

  interface PostcodeData {
    zonecode: string;
    address: string;
    addressEnglish: string;
    addressType: "R" | "J";
    userSelectedType: "R" | "J";
    userLanguageType: "K" | "E";
    roadAddress: string;
    roadAddressEnglish: string;
    jibunAddress: string;
    jibunAddressEnglish: string;
    autoRoadAddress: string;
    autoRoadAddressEnglish: string;
    autoJibunAddress: string;
    autoJibunAddressEnglish: string;
    buildingCode: string;
    buildingName: string;
    apartment: string;
    sido: string;
    sigungu: string;
    sigunguCode: string;
    roadnameCode: string;
    bcode: string;
    roadname: string;
    bname: string;
    bname1: string;
    bname2: string;
    hname: string;
    query: string;
  }

  class Postcode {
    constructor(options: PostcodeOptions);
    open(): void;
    embed(element: HTMLElement): void;
    fold(): void;
  }
}

declare interface Window {
  daum: typeof daum;
}
