# Ascendia

A video player for language learners. 

## Get started

Here is a guide to how to get Asendia running for the first time:

### 1. Clone the repo:
```
~: git clone https://github.com/lianwangtao/Ascendia.git
```

### 2. Rails setup

On how to install Ruby on Rails, please refer to [this guide](https://gorails.com/setup/osx/10.15-catalina).


#### - Install Rails Dependencies
```
~: bundle install
```

#### - Create and Migrate Database
```
~: rake db:create
~: rake db:migrate
```

### 3. React & Electron setup

#### - Install Node dependencies
```
~: yarn
```

### 4. Start Rails

```
~: rails s
```

### 5. Start Electron

Open another Terminal tab:

```
~: yarn electron
```


