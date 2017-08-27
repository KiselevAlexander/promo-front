Документация по сетке Grid
==================

### Настройки в файле _grid.scss
Можно настроить количество колонок для генерации, а также отступы для разных экранов:
> **$column-count** - количество генерируемых колонок
> **desktop** - значение для десктопа
> **tablet** - значение для планшета,
> **phablet** - значение для горизонтальной ориентации телефона,
> **phone** - значение для вертикальной ориентации телефона
> **$column-gapH-gen** - общее для всех экранов расстояние между колонками по горизонтали
> **$column-gapV-gen** - общее для всех экранов расстояние между колонками по вертикали
> **$column-marginV-gen** - общий для всех экранов вертикальный margin у колонок
> **$grid-marginV-gen**  - общий для всех экранов вертикальный margin у контейнера

### Подключение сетки в стилях

```scss
    @include grid-generator-desktop(); // Для десктопа

    @media (min-width: 768px) and (max-width: 999px) {
        @include grid-generator-tablet(); // Для планшета
    }

    @media (min-width: 480px) and (max-width: 767px) {
        @include grid-generator-phablet(); // Для горизонтальной ориентации телефона
    }

    @media (min-width: 0px) and (max-width: 479px) {
        @include grid-generator-phone(); // Для вертикальной ориентации телефона
    }

    /* Для расширенной сетки (пример 2.) включить параметр 'expanded' у миксинов - @include grid-generator...(expanded); */
```

### Использование сетки в html
**1. Списком без закрывающего тега списка (валидно):**

```html
    <ul class"grid-4 tablet-2 phablet-2 phone-2">
        <li class="col"><!--li.col-end-->
        <li class="col"><!--li.col-end-->
        <li class="col"><!--li.col-end-->
        <li class="col"><!--li.col-end-->
    </ul>
```

**2. Колонки слитно между собой:**

```html
    <div class"grid-4 tablet-2 phablet-2 phone-2">
        <div class="col"></div><div class="col"></div><div class="col"></div><div class="col"></div>
    </div>
```

**3. Колонки разделены комментариями:**

```html
    <div class"grid-4 tablet-2 phablet-2 phone-2">
        <!--
            --><div class="col"></div><!--
            --><div class="col"></div><!--
            --><div class="col"></div><!--
            --><div class="col"></div><!--
        -->
    </div>
```

### Примеры:
**1. Показать сетку:**
**_в 4 колонки на десктопе,_**
**_в 3 колонки на планшете,_**
**_в 2 на горизонтальной ориентации телефона,_**
**_в 1 на вертикальной ориентации экрана_**

```html
    <div class"grid-4 tablet-3 phablet-2 phone-1">
        <!--
            --><div class="col"></div><!--
            --><div class="col"></div><!--
            --><div class="col"></div><!--
            --><div class="col"></div><!--
        -->
    </div>
```

**2. Растянуть последнюю колонку сетки:**
**на 4 колонки 6-ти колоночной сетки на десктопе,_**
**на 3 колонки 4-х колоночной сетки на планшете,_**
**на 2 колонки 4-х колоночной сетки в горизонтальной ориентации телефона,_**
**на 2 колонки 2-х колоночной сетки в вертикальной ориентации экрана_**

```html
    <div class"grid-6 tablet-4 phablet-4 phone-2">
        <!--
            --><div class="col"></div><!--
            --><div class="col"></div><!--
            --><div class="col-4 tablet-3 phablet-2 phone-2"></div><!--
        -->
    </div>
```

_Для работы примера требуется подключать миксин с параметром expanded:_

```scss
    @include grid-generator-...(expanded); // Для всех ориентаций экранов
```

**3. Колонки одинаковой высоты:**

```html
    <div class"grid-2 flex">
        <!--
            --><div class="col"></div><!--
            --><div class="col"></div><!--
        -->
    </div>
```

**4. Колонки через float: left, например для структуры**

```html
    <div class"grid-2 float">
        <div class="col float-right"></div>
        <div class="col float-left"> </div>
        <div class="col float-none"> </div>
    </div>
```