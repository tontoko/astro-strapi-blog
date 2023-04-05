import readingTime from "reading-time";

export default {
  beforeCreate(event) {
    const { data, where, select, populate } = event.params;
    const { content } = data;

    if (content && content?.length > 0) {
      event.params.data.readingTime = readingTime(content)?.text || null;
    }
  },
  beforeUpdate(event) {
    const { data, where, select, populate } = event.params;
    const { content } = data;
    if (content && content?.length > 0) {
      event.params.data.readingTime = readingTime(content)?.text || null;
    }
  },
};
