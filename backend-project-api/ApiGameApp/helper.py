from ApiGameApp.models import Category, Game
def validation_filter(CategoryId, IsDisabled):
    return Game.objects.filter(CategoryId=CategoryId, IsDisabled=IsDisabled)