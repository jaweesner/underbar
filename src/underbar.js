(function () {
  'use strict';

  window._ = {};

  // Returns whatever value is passed as the argument. This function doesn't
  // seem very useful, but remember it--if a function needs to provide an
  // iterator when the user does not pass one in, this will be handy.
  _.identity = function (val) {
    return val;
  };

  /**
   * COLLECTIONS
   * ===========
   *
   * In this section, we'll have a look at functions that operate on collections
   * of values; in JavaScript, a 'collection' is something that can contain a
   * number of values--either an array or an object.
   *
   *
   * IMPORTANT NOTE!
   * ===========
   *
   * The .first function is implemented for you, to help guide you toward success
   * in your work on the following functions. Whenever you see a portion of the
   * assignment pre-completed, be sure to read and understand it fully before
   * you proceed. Skipping this step will lead to considerably more difficulty
   * implementing the sections you are responsible for.
   */

  // Return an array of the first n elements of an array. If n is undefined,
  // return just the first element.
  _.first = function (array, n) {
    return n === undefined ? array[0] : array.slice(0, n);
  };

  // Like first, but for the last elements. If n is undefined, return just the
  // last element.
  _.last = function (array, n) {
    return n === undefined ? array[array.length - 1] : (n === 0) ? [] : array.slice(-n);
  };

  // Call iterator(value, key, collection) for each element of collection.
  // Accepts both arrays and objects.
  //
  // Note: _.each does not have a return value, but rather simply runs the
  // iterator function over each item in the input collection.
  _.each = function (collection, iterator) {

    //Array
    if (Array.isArray(collection)) {
      for (var i = 0; i < collection.length; i++) {
        iterator(collection[i], i, collection);
      }
      //Object
    } else {
      for (var key in collection) {
        iterator(collection[key], key, collection);
      }
    }

  };

  // Returns the index at which value can be found in the array, or -1 if value
  // is not present in the array.
  _.indexOf = function (array, target) {
    // TIP: Here's an example of a function that needs to iterate, which we've
    // implemented for you. Instead of using a standard `for` loop, though,
    // it uses the iteration helper `each`, which you will need to write.
    var result = -1;

    _.each(array, function (item, index) {
      if (item === target && result === -1) {
        result = index;
      }
    });

    return result;
  };

  // Return all elements of an array that pass a truth test.
  _.filter = function (collection, test) {
    var newArray = [];
    _.each(collection, function (val) {
      if (test(val)) {
        newArray.push(val);
      };
    });
    return newArray;
  };

  // Return all elements of an array that don't pass a truth test.
  _.reject = function (collection, test) {
    // TIP: see if you can re-use _.filter() here, without simply
    // copying code in and modifying it
    return _.filter(collection, function (val) {
      return !test(val);
    });

  };

  // Produce a duplicate-free version of the array.
  _.uniq = function (array, isSorted, iterator) {
    var uniqueArray = [];
    //faster implementation
    if (isSorted && !iterator) {
      _each(array, function (val, i) {
        if (!i || val !== array[i - 1]) { //short circuit to prevent index out of range error
          singleArray.push(val);
        }
      });

      //Implementation using _.map not allowed by specs :(
      /*
      }else if (iterator){
      var uniqueMaps = [];
      _.each(_.map(array,iterator), function(val, i){
      if (_.indexOf(uniqueMaps, val)===-1){
      uniqueMaps.push(val);
      uniqueArray.push(array[i]);
      }
      });
       */

    } else {
      var uniqueMaps = [];
      _.each(array, function (val, i) {
        if (iterator) {
          if (_.indexOf(uniqueMaps, iterator(val)) === -1) {
            uniqueMaps.push(iterator(val));
            uniqueArray.push(array[i]);
          }
        } else if (_.indexOf(uniqueArray, val) == -1) {
          uniqueArray.push(val);
        }
      });
    };
    return uniqueArray;
  };

  // Return the results of applying an iterator to each element.
  _.map = function (collection, iterator) {
    // map() is a useful primitive iteration function that works a lot
    // like each(), but in addition to running the operation on all
    // the members, it also maintains an array of results.
    var newArray = [];
    _.each(collection, function (val) {
      newArray.push(iterator(val));
    });
    return newArray;

  };

  /*
   * TIP: map is really handy when you want to transform an array of
   * values into a new array of values. _.pluck() is solved for you
   * as an example of this.
   */

  // Takes an array of objects and returns and array of the values of
  // a certain property in it. E.g. take an array of people and return
  // an array of just their ages
  _.pluck = function (collection, key) {
    // TIP: map is really handy when you want to transform an array of
    // values into a new array of values. _.pluck() is solved for you
    // as an example of this.
    return _.map(collection, function (item) {
      return item[key];
    });
  };

  // Reduces an array or object to a single value by repetitively calling
  // iterator(accumulator, item) for each item. accumulator should be
  // the return value of the previous iterator call.
  //
  // You can pass in a starting value for the accumulator as the third argument
  // to reduce. If no starting value is passed, the first element is used as
  // the accumulator, and is never passed to the iterator. In other words, in
  // the case where a starting value is not passed, the iterator is not invoked
  // until the second element, with the first element as its second argument.
  //
  // Example:
  //   var numbers = [1,2,3];
  //   var sum = _.reduce(numbers, function(total, number){
  //     return total + number;
  //   }, 0); // should be 6
  //
  //   var identity = _.reduce([5], function(total, number){
  //     return total + number * number;
  //   }); // should be 5, regardless of the iterator function passed in
  //          No accumulator is given so the first element is used.
  _.reduce = function (collection, iterator, accumulator) {
    if (accumulator === undefined) {
      for (var i in collection) {
        accumulator = collection[i];
        var accumulatorflag = 1;
        break;
      }
    }
    _.each(collection, function (val) {
      if (!accumulatorflag) {
        accumulator = iterator(accumulator, val);
      } else {
        accumulatorflag = 0;
      }
    });
    return accumulator;
  };

  // Determine if the array or object contains a given value (using `===`).
  _.contains = function (collection, target) {
    // TIP: Many iteration problems can be most easily expressed in
    // terms of reduce(). Here's a freebie to demonstrate!
    return _.reduce(collection, function (wasFound, item) {
      if (wasFound) {
        return true;
      }
      return item === target;
    }, false);
  };

  // Determine whether all of the elements match a truth test.
  _.every = function (collection, iterator) {
    // TIP: Try re-using reduce() here.
    if (!iterator) {
      iterator = _.identity
    }

    return _.reduce(collection, function (allItemsPass, item) {
      if (!allItemsPass) {
        return false;
      }
      return Boolean(iterator(item));
    }, true);

  };

  // Determine whether any of the elements pass a truth test. If no iterator is
  // provided, provide a default one
  _.some = function (collection, iterator) {
    // TIP: There's a very clever way to re-use every() here.
    if (!iterator) {
      iterator = _.identity
    };

    return !(_.every(collection, function (val) {
        return !iterator(val);
      }));
  }

  /* Function without _every
  return _.reduce(collection, function(anyItemsPasses, item) {
  if (anyItemsPasses) {
  return true;
  }
  return Boolean(iterator(item));

  }, false);

  };
   */

  /**
   * OBJECTS
   * =======
   *
   * In this section, we'll look at a couple of helpers for merging objects.
   */

  // Extend a given object with all the properties of the passed in
  // object(s).
  //
  // Example:
  //   var obj1 = {key1: "something"};
  //   _.extend(obj1, {
  //     key2: "something new",
  //     key3: "something else new"
  //   }, {
  //     bla: "even more stuff"
  //   }); // obj1 now contains key1, key2, key3 and bla
  _.extend = function (obj) {
    _.each(arguments, function (val, key) {
      if (key == 0) {
        return;
      } else {
        _.each(val, function (innerVal, key) {
          obj[key] = innerVal;
          return;
        });
      }
    });
    return obj;
  };

  // Like extend, but doesn't ever overwrite a key that already
  // exists in obj
  _.defaults = function (obj) {
    _.each(arguments, function (val, key) {
      if (key == 0) {
        return;
      } else {
        _.each(val, function (innerVal, key) {
          if (obj.hasOwnProperty(key)) {
            return;
          };
          obj[key] = innerVal;
          return;
        });
      }
    });
    return obj;

  };

  /**
   * FUNCTIONS
   * =========
   *
   * Now we're getting into function decorators, which take in any function
   * and return out a new version of the function that works somewhat differently
   */

  // Return a function that can be called at most one time. Subsequent calls
  // should return the previously returned value.
  _.once = function (func) {
    // TIP: These variables are stored in a "closure scope" (worth researching),
    // so that they'll remain available to the newly-generated function every
    // time it's called.
    var alreadyCalled = false;
    var result;

    // TIP: We'll return a new function that delegates to the old one, but only
    // if it hasn't been called before.
    return function () {
      if (!alreadyCalled) {
        // TIP: .apply(this, arguments) is the standard way to pass on all of the
        // information from one function call to another.
        result = func.apply(this, arguments);
        alreadyCalled = true;
      }
      // The new function always returns the originally computed result.
      return result;
    };
  };

  // Memorize an expensive function's results by storing them. You may assume
  // that the function only takes primitives as arguments.
  // memoize could be renamed to oncePerUniqueArgumentList; memoize does the
  // same thing as once, but based on many sets of unique arguments.
  //
  // _.memoize should return a function that, when called, will check if it has
  // already computed the result for the given argument and return that value
  // instead if possible.
  _.memoize = function (func) {
    var resultsList = []//array of (results and param list) {params: [param-list] result: X}
    //function checks to see if there is an element in the coll
    //check if the the array contains an object with a this.params = given params. if so, return result, else run function
    return function () {
      var onlyParams = _.pluck(resultsList, 'params');
      var currentParams = Array.prototype.slice.call(arguments, 0, arguments.length); //get copy of params in array type obj. might not be needed?
      var matchIndex = -1;

      _.each(onlyParams, function (prevArgArray, index) { //for each previous array of params
        var indexCounter = -1;
        var hasMatchedParams = _.reduce(currentParams, function (isMatched, liveParam) { ////check if the current input array matches the argument list
            indexCounter++;
            if (!isMatched) {
              return false;
            } else {
              return (liveParam.toString() == prevArgArray[indexCounter].toString());
            }
          }, true)
          if (hasMatchedParams && (prevArgArray.length === currentParams.length)) {
            matchIndex = index;
          }
      });
      if (matchIndex >= 0) {
        return resultsList[matchIndex].result;
      } else {
        var newResult = func.apply(this, arguments);
        resultsList.push({
          params: currentParams,
          result: newResult
        });
        return newResult;
      }
    }
  };

  // Delays a function for the given number of milliseconds, and then calls
  // it with the arguments supplied.
  //
  // The arguments for the original function are passed after the wait
  // parameter. For example _.delay(someFunction, 500, 'a', 'b') will
  // call someFunction('a', 'b') after 500ms
  _.delay = function (func, wait) {
    var inArgs = Array.prototype.slice.call(arguments, 2);
    setTimeout(function () {
      func.apply(null, inArgs)
    }, wait);
    return;
  };

  /**
   * ADVANCED COLLECTION OPERATIONS
   * ==============================
   */

  // Randomizes the order of an array's contents.
  //
  // TIP: This function's test suite will ask that you not modify the original
  // input array. For a tip on how to make a copy of an array, see:
  // http://mdn.io/Array.prototype.slice
  _.shuffle = function (array) {
    var shuffledArray = new Array(array.length);
    var getIndex = function (arr) {
      return Math.floor(Math.random() * arr.length);
    };
    //for each value in the original array, put into a random index on the array
    _.each(array, function (val) {
      var pushFlag = 0;
      while (!pushFlag) {
        let tempIndex = getIndex(array)
          if (shuffledArray[tempIndex] === undefined) {
            shuffledArray[tempIndex] = val;
            pushFlag = 1;
          }
      }

    });
    return shuffledArray;
  };

  /**
   * ADVANCED
   * =================
   *
   * Note: This is the end of the pre-course curriculum. Feel free to continue,
   * but nothing beyond here is required.
   */

  // Calls the method named by functionOrKey on each value in the list.
  // Note: You will need to learn a bit about .apply to complete this.
  _.invoke = function (collection, functionOrKey, args) {
    var methodArgArray = Array.prototype.slice.call(arguments, 2);
    if (typeof collection !== 'object') {
      throw new Error("First parameter must be an object");
    };
    if (typeof functionOrKey == 'function') {
      return _.map(collection, function (val) {
        return functionOrKey.apply(val, methodArgArray);
      });
    } else {
      return _.map(collection, function (val) {
        return val[functionOrKey].apply(val, methodArgArray);
      });
    };

  };

  // Sort the object's values by a criterion produced by an iterator.
  // If iterator is a string, sort objects by that property with the name
  // of that string. For example, _.sortBy(people, 'name') should sort
  // an array of people by their name.
  _.sortBy = function (collection, iterator) {
    if (typeof iterator === 'string') {
      var key = iterator;
      iterator = function (val) {
        return val[key];
      };
    }
    do {
      var swaps = 0;
      _.each(collection, function (val, index) {
        if ((index < collection.length - 1) && ((val == undefined && collection[index + 1] !== undefined) || (iterator(val) > iterator(collection[index + 1])))) {
          let tempval = collection[index + 1];
          collection[index + 1] = val;
          collection[index] = tempval;
          swaps++;
        };
      });
    } while (swaps !== 0);
    return collection;
  };

  // Zip together two or more arrays with elements of the same index
  // going together.
  //
  // Example:
  // _.zip(['a','b','c','d'], [1,2,3]) returns [['a',1], ['b',2], ['c',3], ['d',undefined]]
  _.zip = function () {
    var argArray = Array.prototype.slice.call(arguments, 0);
    return _.reduce(argArray, function (zipArr, arr) {
      _.each(arr, function (val, index) {
        if (zipArr[index] === undefined) {
          zipArr.push([]);
        }
        Array.prototype.push.call(zipArr[index], val);
      });
      //handle undefined
      var arrLength = arr.length;
      while (arrLength < zipArr.length) {
        zipArr[arrLength].push(undefined);
        arrLength++;
      }
      return zipArr;
    }, []);
  };

  // Takes a multidimensional array and converts it to a one-dimensional array.
  // The new array should contain all elements of the multidimensional array.
  //
  // Hint: Use Array.isArray to check if something is an array
  _.flatten = function (nestedArray, result) {
    if (result === undefined) {
      result = [];
    };
    return _.reduce(nestedArray, function (flatArray, element) {
      if (Array.isArray(element)) {
        _.flatten(element, flatArray);
      } else {
        flatArray.push(element);
      }

      return flatArray;
    }, result);

  };

  // Takes an arbitrary number of arrays and produces an array that contains
  // every item shared between all the passed-in arrays.
  _.intersection = function () {
    var keyArray = arguments[0];
    if (arguments.length === 1) {
      return keyArray
    };
    var otherArrays = Array.prototype.slice.call(arguments, 1);
    var intersect = [];
    _.each(keyArray, function (keyVal) {
      if (_.every(otherArrays, function (arrVal) {
          return _.contains(arrVal, keyVal);
        })) {
        intersect.push(keyVal);
      };

    });
    return intersect;
  };

  // Take the difference between one array and a number of other arrays.
  // Only the elements present in just the first array will remain.
  _.difference = function (array) {
    var keyArray = arguments[0];
    if (arguments.length === 1) {
      return keyArray
    };
    var otherArrays = Array.prototype.slice.call(arguments, 1);
    var difference = [];
    _.each(keyArray, function (keyVal) {
      if (!(_.some(otherArrays, function (arrVal) {
            return _.contains(arrVal, keyVal);
          }))) {
        difference.push(keyVal);
      };

    });
    return difference;
  };

  // Returns a function, that, when invoked, will only be triggered at most once
  // during a given window of time.  See the Underbar readme for extra details
  // on this function.
  //
  // Note: This is difficult! It may take a while to implement.
  _.throttle = function (func, wait) {
    var canCallFlag = 1;
    var scheduledRunFlag = 0;
    var savedArgs = [];
    var throttledFunc = function () {
      if (canCallFlag) {
        func.apply(null, Array.prototype.slice.call(arguments, 0));
        canCallFlag = 0;
        setTimeout(function () {
          canCallFlag = 1;
          if (scheduledRunFlag) {
            throttledFunc.apply(null, savedArgs);
            scheduledRunFlag = 0;
          }
        }, wait + 1); //wait time is inclusive
      } else {
        scheduledRunFlag = 1;
        savedArgs = Array.prototype.slice.call(arguments, 0);
      };
    };
    return throttledFunc;
  };
}
  ());