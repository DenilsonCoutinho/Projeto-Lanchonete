export default function OnlyLetter(item) {
    return item.replace(/[^a-zA-Z\s]/g, '');
}