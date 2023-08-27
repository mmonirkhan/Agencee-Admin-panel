const slugMaker = (text: string) => text.replace(/ /g, "-").toLowerCase();
export default slugMaker;
