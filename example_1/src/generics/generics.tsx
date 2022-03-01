import React from "react";

interface IFoobar {
  foo: string;
  bar: string;
  cat: string;
}

const fooBars: Array<IFooBar> = [
  {
    foo: "foo1",
    bar: "bar1",
  },
  {
    foo: "i am foo two",
    bar: "i am bar two",
  },
  {
    foo: "foo three",
    bar: "bar three",
  },
];

function sortByFoo(fooBars: Array<IFoobar>) {
  fooBars.sort((a, b) => {
    if (a.foo > b.foo) {
      return 1;
    }
    if (a.foo < b.foo) {
      return -1;
    }
    return 0;
  });
}
function sortByBar(fooBars: Array<IFoobar>) {
  fooBars.sort((a, b) => {
    if (a.bar > b.bar) {
      return 1;
    }
    if (a.bar < b.bar) {
      return -1;
    }
    return 0;
  });
}

function sortByKey<T>(data: Array<T>, key: keyof T) {
  data.sort((a, b) => {
    if (a[key] > b[key]) {
      return 1;
    }
    if (a[key] < b[key]) {
      return -1;
    }
    return 0;
  });
}

sortByKey<IFoobar>(fooBars, "foo");

sortByKey<IFoobar>(fooBars, "cat");
