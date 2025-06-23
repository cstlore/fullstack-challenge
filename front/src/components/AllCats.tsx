import '../App.css'
import {RefObject, useEffect, useRef, useState} from "react"
import {Login} from "./Login.tsx";
import {Cat} from "../interfaces/CatInterface.tsx";
import {CatCard} from "./CatCard.tsx";

function countCardsOnScreen({
                                cardWidth = 225,
                                cardHeight = 225,
                                gap = 48,
                                paddingX = 62,
                                paddingY = 0
                            } = {}) {
    const containerWidth = window.innerWidth - paddingX * 2
    const containerHeight = window.innerHeight - paddingY * 2
    const cardsPerRow = Math.floor((containerWidth + gap) / (cardWidth + gap))
    const cardsPerCol = Math.floor((containerHeight + gap) / (cardHeight + gap))
    return cardsPerRow * cardsPerCol
}

function useOnScreen<T extends Element = Element>(options?: IntersectionObserverInit): [RefObject<T>, boolean] {
    const ref = useRef<T>(null);
    const [isVisible, setIsVisible] = useState<boolean>(false);

    useEffect(() => {
        const element = ref.current;
        if (!element) return;

        const observer = new IntersectionObserver(
            ([entry]: IntersectionObserverEntry[]) => {
                setIsVisible(entry.isIntersecting);
            },
            options
        );

        observer.observe(element);

        return () => observer.disconnect();
    }, [ref, options]);

    return [ref, isVisible];
}

function AllCats() {
    Login()
    const [viewedElements, setViewedElements] = useState<Cat[]>([])
    const [ref, isVisible] = useOnScreen<HTMLParagraphElement>({root: null, rootMargin: '0px', threshold: 0});
    const [page, setPage] = useState(0);
    const fetchCats = async () => {
        const headers = new Headers({
            "Content-Type": "application/json",
            "x-api-key": "live_mDebJjfjDOW7XPr6CedLjSXUPkZddPcv8xzCjzrk9lYQptFskaAz2wK6bKSZXTlw"
        });
        fetch(`https://api.thecatapi.com/v1/images/search?size=med&mime_types=jpg&format=json&has_breeds=true&order=RANDOM&page=${page}&limit=${3 * countCardsOnScreen()}`, {
            method: 'GET',
            headers: headers,
            redirect: 'follow'
        })
            .then(response => response.text())
            .then(result => {
                setViewedElements([...viewedElements, ...JSON.parse(result)])
            })
            .catch(error => console.log('error', error));
        setPage(page + 1)
    }
    useEffect(() => {
        if (isVisible) {
            fetchCats()
        }
    }, [isVisible])
    return (
        <div className="w-[100%]">
            <div
                className="w-[100%] pl-[62px] pt-[48px] pr-[62px] overflow-y-auto overflow-x-hidden grid gap-[48px] grid-cols-[repeat(auto-fit,225px)] text-center">
                {viewedElements.length > 0 && viewedElements.map((item: Cat) => (
                    <CatCard cat_id={item.id}/>
                ))}
            </div>
            <p className="w-[100%] mt-[24px] pb-[24px] text-black text-center" ref={ref}>... загружаем еще котиков
                ...</p>
        </div>
    )
}

export default AllCats
