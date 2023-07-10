// priority: 50

CustomRecipes.farmersDelight = {
  cooking: function (Output, Inputs) {
    return new this.$cooking(Output, Inputs);
  },
  $cooking: function (Output, Inputs) {
    this.recipe = {
      type: "farmersdelight:cooking",
      ingredients: Inputs,
      result: Output,
    };
    return this;
  },

  cutting: function (Outputs, Input, Tool) {
    return new this.$cutting(Outputs, Input, Tool);
  },
  $cutting: function (Outputs, Input, Tool) {
    this.recipe = {
      type: "farmersdelight:cutting",
      ingredients: Input,
      tool: Tool,
      result: Outputs,
    };
    return this;
  },
};

Object.assign(
  CustomRecipes.farmersDelight.$cooking.prototype,
  CustomRecipes.$base,
  {
    recipeBookTab: function (tabName) {
      this.recipe_book_tab = tabName;
      return this;
    },
    container: function (overrideObject) {
      this.container = overrideObject;
      return this;
    },
    cookingTime: function (tickTime) {
      this.cookingtime = tickTime;
      return this;
    },
  }
);

Object.assign(
  CustomRecipes.farmersDelight.$cutting.prototype,
  CustomRecipes.$base,
  {
    sound: function (soundId) {
      this.sound = soundId;
      return this;
    },
  }
);
