from django.contrib import admin
from .models import CarMake, CarModel


# Register your models here.

# CarModelInline class


# CarModelAdmin class
class CarModelAdmin(admin.ModelAdmin):

    search_fields = ["name"]


# CarMakeAdmin class with CarModelInline
class CarMakeAdmin(admin.ModelAdmin):
    list_display = ["name", "description"]
    search_fields = ["name"]


# Register models here

admin.site.register(CarMake, CarMakeAdmin)
admin.site.register(CarModel, CarModelAdmin)
